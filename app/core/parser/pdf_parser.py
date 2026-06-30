import re
import base64

try:
    import fitz  # PyMuPDF
    FITZ_OK = True
except ImportError:
    FITZ_OK = False


def parse(file_path):
    if not FITZ_OK:
        raise ImportError("PyMuPDF is not installed. Run: pip install pymupdf")

    doc = fitz.open(file_path)

    title = doc.metadata.get('title', '') or 'Unknown Title'
    author = doc.metadata.get('author', '') or 'Unknown Author'

    # Try to extract cover from first page
    cover_b64 = None
    try:
        page = doc[0]
        pix = page.get_pixmap(matrix=fitz.Matrix(0.5, 0.5))
        cover_b64 = base64.b64encode(pix.tobytes('png')).decode()
    except Exception:
        pass

    # Collect all text blocks with font sizes for heading detection
    all_blocks = []
    for page_num, page in enumerate(doc):
        blocks = page.get_text('dict')['blocks']
        for block in blocks:
            if block.get('type') != 0:
                continue
            for line in block.get('lines', []):
                for span in line.get('spans', []):
                    text = span.get('text', '').strip()
                    size = span.get('size', 12)
                    if text:
                        all_blocks.append({'text': text, 'size': size, 'page': page_num})

    if not all_blocks:
        return {'title': title, 'author': author, 'language': 'en',
                'cover_b64': cover_b64, 'chapters': []}

    # Determine heading font size threshold (top 10% of font sizes)
    sizes = sorted(set(b['size'] for b in all_blocks), reverse=True)
    heading_threshold = sizes[max(0, len(sizes) // 10)] if len(sizes) > 1 else sizes[0]

    # Split into chapters by heading detection
    chapters = []
    current_title = title
    current_lines = []
    order = 0

    for block in all_blocks:
        is_heading = (
            block['size'] >= heading_threshold
            and len(block['text']) < 120
            and re.search(
                r'\b(chapter|prologue|epilogue|part|section|preface|'
                r'foreword|introduction|afterword|appendix)\b',
                block['text'], re.IGNORECASE
            )
        )
        if is_heading and current_lines:
            content = ' '.join(current_lines).strip()
            if len(content) > 100:
                chapters.append({
                    'title': current_title,
                    'order_num': order,
                    'content': content,
                    'word_count': len(content.split()),
                })
                order += 1
            current_title = block['text'].strip()
            current_lines = []
        else:
            current_lines.append(block['text'])

    if current_lines:
        content = ' '.join(current_lines).strip()
        if len(content) > 100:
            chapters.append({
                'title': current_title,
                'order_num': order,
                'content': content,
                'word_count': len(content.split()),
            })

    if not chapters:
        full_text = '\n'.join(b['text'] for b in all_blocks)
        chapters = [{
            'title': title,
            'order_num': 0,
            'content': full_text,
            'word_count': len(full_text.split()),
        }]

    doc.close()

    return {
        'title': title,
        'author': author,
        'language': 'en',
        'cover_b64': cover_b64,
        'chapters': chapters,
    }

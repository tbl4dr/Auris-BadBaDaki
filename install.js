module.exports = {
  run: [
  // {
  //   method: "shell.run",
  //   params: {
  //     message: [
  //       "git clone https://github.com/stitionai/devika app",
  //     ]
  //   }
  // },

  {
    method: "shell.run",
    params: {
      path: "app",
      message: "python -m venv env"
    }
  }, 
  {
    method: "script.start",
    params: {
      uri: "torch.js",
      params: {
        path: "app",
        venv: "env",
        flashattention: true
      }
    }
  }, 
  {
    method: "shell.run",
    params: {
      venv: "env",
      path: "app",
      message: [
        "uv pip install omnivoice --no-deps"
        , "uv pip install -r req.txt"
        ,"uv pip install transformers --upgrade"
        
      ]
    }
  }, 
  {
  method: "shell.run",
  params: {
    venv: "env",
    path: "app",
    message: "python -m spacy download en_core_web_sm",
  }
  }, 

  // {
  // method: "shell.run",
  // params: {
  //   venv: "env",
  //   path: "app",
  //   message: "python reader/setup.py",
  // }
  // }, 

  {
    method: "notify",
    params: {
      html: "Installation Complete! Click 'Start' to launch the application."
    }
  }
]
}

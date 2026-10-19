
const API = 'http://127.0.0.1:8000'

const formLogin = document.getElementById('form-login')
const botaoLogin = formLogin.querySelector('button[type="submit"]')

formLogin.addEventListener('submit', async (e) => {
  e.preventDefault()

  const dados = {
    email: document.getElementById('email').value.trim(),
    senha: document.getElementById('senha').value
  }

  botaoLogin.disabled = true
  botaoLogin.textContent = 'Entrando...'

  try {
    const resposta = await fetch(`${API}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(dados)
    })

    const resultado = await resposta.json()

    console.log('Status do login:', resposta.status)
    console.log('Resposta da API:', resultado)

    if (
      resposta.ok &&
      resultado.access_token &&
      resultado.token_type
    ) {
      localStorage.setItem('token', resultado.access_token)

      // Só redireciona depois de confirmar que recebeu o token.
      window.location.href = 'dashboard.html'
      return
    }

    const mensagem =
      resultado.detail ||
      resultado.erro ||
      'A API não retornou um token de acesso válido.'

    alert('Não foi possível entrar: ' + mensagem)

  } catch (erro) {
    console.error('Erro durante o login:', erro)

    alert(
      'Não foi possível conectar à API. ' +
      'Confira se o FastAPI está funcionando.'
    )
  } finally {
    botaoLogin.disabled = false
    botaoLogin.innerHTML =
      'Entrar na sua conta <span aria-hidden="true">↗</span>'
  }
})

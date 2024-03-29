export const showLocalizedAuthError = (message: string): string => {
  if (message.includes("wrong-password")) {
    return "A senha é inválida ou o usuário não tem uma senha";
  }

  if (message.includes("weak-password")) {
    return "A senha deve ter 6 caracteres ou mais.";
  }

  if (message.includes("user-not-found")) {
    return "Endereço de email ou senha inválidos.";
  }

  if (message.includes("email-already-in-use")) {
    return "Este endereço de email já está sendo utilizado.";
  }

  if (message.includes("invalid-email")) {
    return "Endereço de email inválido.";
  }

  if (message.includes("requires-recent-login")) {
    return "Por favor, faça login novamente";
  }
  
  if (message.includes("Quota")) {
    return "Falha no sistema. Favor entrar em contato com o adminstrador.";
  }

  return "Falha de autenticação";
}

export default showLocalizedAuthError

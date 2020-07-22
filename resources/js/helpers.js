function handleGQLErrors(resp) {
  let issues = []
  if (resp.errors[0].extensions.category === 'validation') {
    Object.values(resp.errors[0].extensions.validation).forEach((errors) => {
      errors.forEach((error) => {
        issues.push(error.replace('input.', ''))
      })
    })
  }
  return issues
}

export { handleGQLErrors }

function handleGQLResponse(resp, onSuccess) {
  if (resp.errors) {
    console.log('err')
    console.log(resp)
    if (resp.errors[0].extensions.category === 'validation') {
      Object.values(resp.errors[0].extensions.validation).forEach((errors) => {
        errors.forEach((error) => {
          console.log(error.replace('input.', ''))
        })
      })
    }
  } else {
    onSuccess()
  }
}

export { handleGQLResponse }

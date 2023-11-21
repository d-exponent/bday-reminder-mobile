import React from 'react'

const useLoading = () => {
  const [isLoading, setIsLoading] = React.useState(false)

  return {
    loadingAction: isLoading,
    setLoadingAction: (action: boolean) => setIsLoading(action)
  }
}

export default useLoading

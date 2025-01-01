"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
type Props = {
  error: Error,
  reset: () => {}
}
function ErrorPage({error, reset}: Props) {
  console.log({error})
  return (
    <div>
      {error?.message}
      <Button onClick={reset}>Làm mới</Button>
    </div>
  )
}

export default ErrorPage
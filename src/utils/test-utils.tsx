import { render, RenderOptions } from '@testing-library/react'

type CustomRenderProps = Omit<RenderOptions, 'queries'>

const customRender = (
  ui: React.ReactElement,
  customProps: CustomRenderProps = {}
) => render(ui, customProps)

export * from '@testing-library/react'
export { customRender as render }

import { Grid, GridItem } from '../../../src'

const cell =
  'flex items-center justify-center rounded-md border border-border bg-surface-100 py-6 text-xs text-foreground-light'

export default function GridDemo() {
  return (
    <Grid columns={{ base: 2, md: 4 }} gap="sm" className="w-full max-w-md">
      <GridItem colSpan={2} className={cell}>
        col-span-2
      </GridItem>
      <GridItem className={cell}>1</GridItem>
      <GridItem className={cell}>2</GridItem>
      <GridItem className={cell}>3</GridItem>
      <GridItem className={cell}>4</GridItem>
      <GridItem colSpan={2} colStart={2} className={cell}>
        col-span-2 col-start-2
      </GridItem>
      <GridItem order={2} className={cell}>
        order-2
      </GridItem>
      <GridItem order={1} className={cell}>
        order-1
      </GridItem>
      <GridItem className={cell}>5</GridItem>
      <GridItem className={cell}>6</GridItem>
    </Grid>
  )
}

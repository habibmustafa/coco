import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../../src'

export default function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>Restarts the database</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

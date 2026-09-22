import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from '../../../src'

export default function TabsDemo() {
  return (
    <Tabs defaultValue="table" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="table">Table</TabsTrigger>
        <TabsTrigger value="sql">SQL</TabsTrigger>
        <TabsTrigger value="policies">Policies</TabsTrigger>
        <TabsIndicator />
      </TabsList>
      <TabsContent value="table" className="text-sm text-foreground-light">
        The table editor lives here.
      </TabsContent>
      <TabsContent value="sql" className="text-sm text-foreground-light">
        Run queries against the database.
      </TabsContent>
      <TabsContent value="policies" className="text-sm text-foreground-light">
        Row level security policies.
      </TabsContent>
    </Tabs>
  )
}

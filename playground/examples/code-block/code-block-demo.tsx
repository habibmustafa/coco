import { CodeBlock } from '../../../src'

const source = `create table profiles (
  id uuid references auth.users primary key,
  username text unique
);`

export default function CodeBlockDemo() {
  return (
    <CodeBlock title="schema.sql" language="pgsql" className="language-pgsql">
      {source}
    </CodeBlock>
  )
}

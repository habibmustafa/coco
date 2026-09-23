import { Database } from 'lucide-react'

import { GlassPanel } from '../../../src'

export default function GlassPanelDemo() {
  return (
    <div className="w-full max-w-sm">
      <GlassPanel
        title="Database"
        icon={<Database className="w-5 h-5 text-foreground-light" />}
        showIconBg
        showLink
      >
        Every Supabase project is a dedicated Postgres database.
      </GlassPanel>
    </div>
  )
}

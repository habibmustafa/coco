import { GenericSkeletonLoader, GenericTableLoader } from '../../../src'

export default function ShimmeringLoaderDemo() {
  return (
    <div className="flex w-full flex-col gap-6">
      <GenericSkeletonLoader />
      <GenericTableLoader headers={['Name', 'Status', 'Region']} numRows={3} />
    </div>
  )
}

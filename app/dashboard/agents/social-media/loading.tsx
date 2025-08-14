export default function SocialMediaAgentLoading() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="glass-card-strong rounded-2xl p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="h-8 bg-white/10 rounded-lg w-64 animate-pulse"></div>
            <div className="h-5 bg-white/5 rounded-lg w-96 animate-pulse"></div>
          </div>
          <div className="w-16 h-16 bg-white/10 rounded-2xl animate-pulse"></div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="glass-card p-1 h-12 rounded-xl">
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 bg-white/10 rounded-lg w-24 animate-pulse"></div>
          ))}
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass-card border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-white/10 rounded w-24 animate-pulse"></div>
                  <div className="h-8 bg-white/10 rounded w-16 animate-pulse"></div>
                </div>
                <div className="w-12 h-12 bg-white/10 rounded-xl animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Card */}
        <div className="glass-card border-white/10 p-6">
          <div className="space-y-4">
            <div className="h-6 bg-white/10 rounded w-48 animate-pulse"></div>
            <div className="h-4 bg-white/5 rounded w-72 animate-pulse"></div>

            <div className="space-y-4 mt-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl">
                  <div className="w-12 h-12 bg-white/10 rounded-xl animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-white/10 rounded w-48 animate-pulse"></div>
                    <div className="h-3 bg-white/5 rounded w-32 animate-pulse"></div>
                  </div>
                  <div className="w-20 h-8 bg-white/10 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

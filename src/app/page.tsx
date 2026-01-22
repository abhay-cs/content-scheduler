"use client"
import Link from "next/link"
import { useTheme } from "@/context/ThemeContext"
import { ArrowRight, Calendar, Video, BarChart, Zap, Shield, CheckCircle, Users, Clock, TrendingUp, PlayCircle, Monitor } from "lucide-react"
import { cn } from "@/lib/utils"

export default function LandingPage() {
  const { darkMode } = useTheme()

  const features = [
    {
      icon: Video,
      title: "Content Library",
      description: "Upload and manage all your digital content in one place. Organize ads, promos, and trivia with ease.",
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Schedule content for specific time slots. Replace national ads with local promotions during commercial breaks.",
    },
    {
      icon: BarChart,
      title: "Analytics & Insights",
      description: "Track engagement and performance metrics to optimize your content strategy.",
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Make changes instantly. Your scheduled content updates across all displays in real-time.",
    },
  ]

  return (
    <div className={cn(
      "min-h-screen flex flex-col",
      darkMode ? "bg-[#0a0a0a] text-zinc-200" : "bg-white text-zinc-800"
    )}>
      {/* Header */}
      <header className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-xl",
        darkMode ? "bg-[#0a0a0a]/80 border-white/10" : "bg-white/80 border-gray-200"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <p className={cn(
                "text-xl font-semibold tracking-tight",
                darkMode ? "text-white" : "text-gray-900"
              )}>
                StreamFlow
              </p>
            </div>
            <Link
              href="/dashboard"
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-colors",
                darkMode
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              )}
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative overflow-hidden">
        {/* Flying Footballs Background Animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => {
            const randomLeft = Math.random() * 100
            const randomTop = Math.random() * 100
            const randomDuration = 18 + Math.random() * 12
            const randomDelay = Math.random() * 8
            const useReverse = i % 2 === 0
            const animationName = useReverse ? 'flyFootballReverse' : 'flyFootball'
            
            return (
              <div
                key={i}
                className="absolute text-3xl md:text-4xl lg:text-5xl"
                style={{
                  left: `${randomLeft}%`,
                  top: `${randomTop}%`,
                  animation: `${animationName} ${randomDuration}s linear infinite`,
                  animationDelay: `${randomDelay}s`,
                  opacity: 0.08,
                }}
              >
                ⚽
              </div>
            )
          })}
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className={cn(
              "text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight",
              darkMode ? "text-white" : "text-gray-900"
            )}>
              Replace National Ads with
              <span className={cn(
                "block mt-2",
                darkMode ? "text-blue-400" : "text-blue-600"
              )}>
                Local Content
              </span>
            </h1>
            <p className={cn(
              "text-xl sm:text-2xl mb-8 max-w-2xl mx-auto",
              darkMode ? "text-zinc-400" : "text-gray-600"
            )}>
              StreamFlow helps venue managers schedule and display local promotions, 
              trivia, and ads during commercial breaks on venue TVs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/dashboard"
                className={cn(
                  "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold",
                  "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
                  "hover:opacity-90 transition-all duration-200 shadow-lg shadow-blue-500/30",
                  "transform hover:-translate-y-0.5"
                )}
              >
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/contents"
                className={cn(
                  "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold border",
                  darkMode
                    ? "border-white/20 text-white hover:bg-white/10"
                    : "border-gray-300 text-gray-900 hover:bg-gray-50"
                )}
              >
                View Demo
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Users, value: "500+", label: "Venues" },
              { icon: PlayCircle, value: "10K+", label: "Content Items" },
              { icon: Clock, value: "24/7", label: "Scheduling" },
              { icon: TrendingUp, value: "95%", label: "Uptime" },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className={cn(
                    "p-4 rounded-xl border text-center",
                    darkMode
                      ? "bg-[#1a1a1a]/80 border-white/10"
                      : "bg-white border-gray-200"
                  )}
                >
                  <Icon className={cn(
                    "h-6 w-6 mx-auto mb-2",
                    darkMode ? "text-blue-400" : "text-blue-600"
                  )} />
                  <div className={cn(
                    "text-2xl font-bold mb-1",
                    darkMode ? "text-white" : "text-gray-900"
                  )}>
                    {stat.value}
                  </div>
                  <div className={cn(
                    "text-sm",
                    darkMode ? "text-zinc-400" : "text-gray-600"
                  )}>
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div> */}
        </div>
      </section>

      {/* Visual Preview Section */}
      <section className={cn(
        "py-20 px-4 sm:px-6 lg:px-8",
        darkMode ? "bg-[#0a0a0a]" : "bg-white"
      )}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={cn(
              "text-3xl sm:text-4xl font-bold mb-4",
              darkMode ? "text-white" : "text-gray-900"
            )}>
              See it in action
            </h2>
            <p className={cn(
              "text-lg max-w-2xl mx-auto",
              darkMode ? "text-zinc-400" : "text-gray-600"
            )}>
              A clean, intuitive interface designed for busy venue managers.
            </p>
          </div>
          <div className={cn(
            "rounded-2xl border overflow-hidden shadow-2xl",
            darkMode ? "bg-[#1a1a1a] border-white/10" : "bg-gray-50 border-gray-200"
          )}>
            <div className={cn(
              "h-8 flex items-center gap-2 px-4 border-b",
              darkMode ? "bg-[#111111] border-white/10" : "bg-gray-100 border-gray-200"
            )}>
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className={cn(
                "ml-auto text-xs font-mono",
                darkMode ? "text-zinc-500" : "text-gray-500"
              )}>
                dashboard.streamflow.com
              </div>
            </div>
            <div className={cn(
              "aspect-video flex items-center justify-center p-12",
              darkMode ? "bg-[#0a0a0a]" : "bg-white"
            )}>
              <div className="text-center">
                <Monitor className={cn(
                  "h-16 w-16 mx-auto mb-4",
                  darkMode ? "text-blue-400" : "text-blue-600"
                )} />
                <p className={cn(
                  "text-lg font-semibold mb-2",
                  darkMode ? "text-white" : "text-gray-900"
                )}>
                  Dashboard Preview
                </p>
                <p className={cn(
                  "text-sm",
                  darkMode ? "text-zinc-400" : "text-gray-600"
                )}>
                  <Link href="/dashboard" className={cn(
                    "underline hover:no-underline",
                    darkMode ? "text-blue-400" : "text-blue-600"
                  )}>
                    Click to explore the dashboard
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={cn(
        "py-20 px-4 sm:px-6 lg:px-8",
        darkMode ? "bg-[#111111]" : "bg-gray-50"
      )}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={cn(
              "text-3xl sm:text-4xl font-bold mb-4",
              darkMode ? "text-white" : "text-gray-900"
            )}>
              Everything you need to manage content
            </h2>
            <p className={cn(
              "text-lg max-w-2xl mx-auto",
              darkMode ? "text-zinc-400" : "text-gray-600"
            )}>
              StreamFlow provides all the tools you need to schedule and display 
              content across your venue's digital displays.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className={cn(
                    "p-6 rounded-xl border transition-all duration-300",
                    "hover:shadow-xl hover:-translate-y-1",
                    darkMode
                      ? "bg-[#1a1a1a]/80 border-white/10 hover:border-white/20"
                      : "bg-white border-gray-200 hover:border-gray-300"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
                    darkMode ? "bg-blue-500/20" : "bg-blue-100"
                  )}>
                    <Icon className={cn(
                      "h-6 w-6",
                      darkMode ? "text-blue-400" : "text-blue-600"
                    )} />
                  </div>
                  <h3 className={cn(
                    "text-xl font-semibold mb-2",
                    darkMode ? "text-white" : "text-gray-900"
                  )}>
                    {feature.title}
                  </h3>
                  <p className={cn(
                    "text-base",
                    darkMode ? "text-zinc-400" : "text-gray-600"
                  )}>
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Use Cases / Benefits Section */}
      <section className={cn(
        "py-20 px-4 sm:px-6 lg:px-8",
        darkMode ? "bg-[#0a0a0a]" : "bg-white"
      )}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={cn(
              "text-3xl sm:text-4xl font-bold mb-4",
              darkMode ? "text-white" : "text-gray-900"
            )}>
              Perfect for your venue
            </h2>
            <p className={cn(
              "text-lg max-w-2xl mx-auto",
              darkMode ? "text-zinc-400" : "text-gray-600"
            )}>
              Whether you run a sports bar, restaurant, or entertainment venue, 
              StreamFlow helps you maximize your display screens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Sports Bars",
                description: "Show game highlights, local team promos, and happy hour specials during commercial breaks.",
                icon: "🏈",
              },
              {
                title: "Restaurants",
                description: "Promote daily specials, events, and loyalty programs to diners watching TV.",
                icon: "🍽️",
              },
              {
                title: "Entertainment Venues",
                description: "Display trivia questions, upcoming events, and local business partnerships.",
                icon: "🎬",
              },
            ].map((useCase, index) => (
              <div
                key={index}
                className={cn(
                  "p-6 rounded-xl border transition-all duration-300",
                  "hover:shadow-xl hover:-translate-y-1",
                  darkMode
                    ? "bg-[#1a1a1a]/80 border-white/10 hover:border-white/20"
                    : "bg-gray-50 border-gray-200 hover:border-gray-300"
                )}
              >
                <div className="text-4xl mb-4">{useCase.icon}</div>
                <h3 className={cn(
                  "text-xl font-semibold mb-2",
                  darkMode ? "text-white" : "text-gray-900"
                )}>
                  {useCase.title}
                </h3>
                <p className={cn(
                  "text-base",
                  darkMode ? "text-zinc-400" : "text-gray-600"
                )}>
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className={cn(
        "py-16 px-4 sm:px-6 lg:px-8 border-t",
        darkMode ? "bg-[#111111] border-white/10" : "bg-gray-50 border-gray-200"
      )}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: Shield,
                title: "Secure & Reliable",
                description: "Enterprise-grade security with 99.9% uptime guarantee.",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Real-time updates across all displays in seconds.",
              },
              {
                icon: CheckCircle,
                title: "Easy to Use",
                description: "Intuitive interface that requires no training.",
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="flex flex-col items-center">
                  <div className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center mb-4",
                    darkMode ? "bg-blue-500/20" : "bg-blue-100"
                  )}>
                    <Icon className={cn(
                      "h-8 w-8",
                      darkMode ? "text-blue-400" : "text-blue-600"
                    )} />
                  </div>
                  <h3 className={cn(
                    "text-lg font-semibold mb-2",
                    darkMode ? "text-white" : "text-gray-900"
                  )}>
                    {item.title}
                  </h3>
                  <p className={cn(
                    "text-sm max-w-xs",
                    darkMode ? "text-zinc-400" : "text-gray-600"
                  )}>
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={cn(
        "py-20 px-4 sm:px-6 lg:px-8",
        darkMode ? "bg-[#0a0a0a]" : "bg-white"
      )}>
        <div className="max-w-4xl mx-auto text-center">
          <div className={cn(
            "p-8 sm:p-12 rounded-2xl border",
            darkMode
              ? "bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-white/10"
              : "bg-gradient-to-br from-blue-50 to-purple-50 border-gray-200"
          )}>
            <h2 className={cn(
              "text-3xl sm:text-4xl font-bold mb-4",
              darkMode ? "text-white" : "text-gray-900"
            )}>
              Ready to get started?
            </h2>
            <p className={cn(
              "text-lg mb-8",
              darkMode ? "text-zinc-400" : "text-gray-600"
            )}>
              Start scheduling your content today and take control of your venue's displays.
            </p>
            <Link
              href="/dashboard"
              className={cn(
                "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold",
                "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
                "hover:opacity-90 transition-all duration-200 shadow-lg shadow-blue-500/30",
                "transform hover:-translate-y-0.5"
              )}
            >
              Launch Dashboard
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={cn(
        "border-t py-8 px-4 sm:px-6 lg:px-8",
        darkMode ? "bg-[#111111] border-white/10" : "bg-gray-50 border-gray-200"
      )}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
          <p className={cn(
            "text-sm mb-4 sm:mb-0",
            darkMode ? "text-zinc-400" : "text-gray-600"
          )}>
            © 2024 StreamFlow. Built for venue managers.
          </p>
          <div className="flex gap-6">
            <Link
              href="/dashboard"
              className={cn(
                "text-sm hover:underline",
                darkMode ? "text-zinc-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
              )}
            >
              Dashboard
            </Link>
            <Link
              href="/contents"
              className={cn(
                "text-sm hover:underline",
                darkMode ? "text-zinc-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
              )}
            >
              Content Library
            </Link>
            <Link
              href="/scheduler"
              className={cn(
                "text-sm hover:underline",
                darkMode ? "text-zinc-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
              )}
            >
              Schedule
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

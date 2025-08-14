"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { User, Bell, Shield, CreditCard, Key, Palette } from "lucide-react"

export default function UserSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">User Settings</h1>
        <p className="text-gray-400">Manage your account preferences and configuration.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Settings */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-card border-white/10">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-white">Profile Information</CardTitle>
                  <CardDescription className="text-gray-400">Update your personal details</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-300">
                    First Name
                  </Label>
                  <Input id="firstName" defaultValue="Autonomous" className="glass-input" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-300">
                    Last Name
                  </Label>
                  <Input id="lastName" defaultValue="Studios" className="glass-input" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email Address
                </Label>
                <Input id="email" type="email" defaultValue="admin@autonomous-studios.com" className="glass-input" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-gray-300">
                  Company
                </Label>
                <Input id="company" defaultValue="Autonomous Studios" className="glass-input" />
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white border-0">
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-white">Notifications</CardTitle>
                  <CardDescription className="text-gray-400">Configure your notification preferences</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300 font-medium">Agent Completion Alerts</Label>
                  <p className="text-sm text-gray-400">Get notified when agents complete tasks</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-white/10" />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300 font-medium">Error Notifications</Label>
                  <p className="text-sm text-gray-400">Receive alerts for agent failures</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-white/10" />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300 font-medium">Weekly Reports</Label>
                  <p className="text-sm text-gray-400">Get weekly performance summaries</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-white">Security</CardTitle>
                  <CardDescription className="text-gray-400">Manage your account security settings</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-gray-300">
                  Current Password
                </Label>
                <Input id="currentPassword" type="password" className="glass-input" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-gray-300">
                  New Password
                </Label>
                <Input id="newPassword" type="password" className="glass-input" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300">
                  Confirm New Password
                </Label>
                <Input id="confirmPassword" type="password" className="glass-input" />
              </div>
              <Button variant="outline" className="border-white/20 text-gray-300 hover:bg-white/5 bg-transparent">
                Update Password
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Plan */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-white">Current Plan</CardTitle>
                  <Badge className="bg-gradient-to-r from-purple-600 to-violet-600 text-white border-0 mt-1">
                    Enterprise
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Agents</span>
                  <span className="text-white">Unlimited</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">API Calls</span>
                  <span className="text-white">1M / month</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Storage</span>
                  <span className="text-white">1TB</span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full border-white/20 text-gray-300 hover:bg-white/5 bg-transparent"
              >
                Manage Billing
              </Button>
            </CardContent>
          </Card>

          {/* API Keys */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <Key className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-white">API Access</CardTitle>
                  <CardDescription className="text-gray-400">Manage your API keys</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-300">Primary API Key</Label>
                <div className="flex space-x-2">
                  <Input value="as_••••••••••••••••••••" readOnly className="glass-input font-mono text-sm" />
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/20 text-gray-300 hover:bg-white/5 bg-transparent"
                  >
                    Copy
                  </Button>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full border-white/20 text-gray-300 hover:bg-white/5 bg-transparent"
              >
                Generate New Key
              </Button>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-white">Preferences</CardTitle>
                  <CardDescription className="text-gray-400">Customize your experience</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-gray-300">Dark Mode</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-gray-300">Auto-save</Label>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Timezone</Label>
                <Input defaultValue="UTC-8 (Pacific)" className="glass-input" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

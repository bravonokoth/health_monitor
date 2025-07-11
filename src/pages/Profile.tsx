
import React, { useEffect, useState } from 'react'
import { User, Mail, Phone, MapPin, Save } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/hooks/useAuth'
import { supabase, Profile } from '@/lib/supabase'

const ProfilePage: React.FC = () => {
  const { user } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: ''
  })

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) {
        // Profile doesn't exist, create one
        const newProfile = {
          id: user.id,
          name: user.user_metadata?.name || '',
          email: user.email || '',
          phone: '',
          location: ''
        }

        const { error: insertError } = await supabase
          .from('profiles')
          .insert(newProfile)

        if (!insertError) {
          setProfile(newProfile as Profile)
          setFormData({
            name: newProfile.name,
            phone: newProfile.phone,
            location: newProfile.location
          })
        }
      } else {
        setProfile(data)
        setFormData({
          name: data.name || '',
          phone: data.phone || '',
          location: data.location || ''
        })
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setSaving(true)
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: formData.name,
          phone: formData.phone,
          location: formData.location
        })
        .eq('id', user.id)

      if (error) throw error

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })

      // Refresh profile data
      fetchProfile()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex items-center space-x-3">
        <User className="h-8 w-8 text-cyan-600" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                  <User className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {profile?.name || 'User'}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {profile?.email}
                </p>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  {profile?.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>{profile.phone}</span>
                    </div>
                  )}
                  {profile?.location && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Edit Profile Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-cyan-600" />
                <span>Edit Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Full Name</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      className="bg-white/50 dark:bg-gray-800/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>Email</span>
                    </Label>
                    <Input
                      id="email"
                      value={profile?.email || ''}
                      disabled
                      className="bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500">Email cannot be changed</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>Phone Number</span>
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter your phone number"
                      className="bg-white/50 dark:bg-gray-800/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>Location</span>
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Enter your location"
                      className="bg-white/50 dark:bg-gray-800/50"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={saving}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ProfilePage

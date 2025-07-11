
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { Heart, Thermometer, Activity, Droplets } from 'lucide-react'

const AddHealthData: React.FC = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    heart_rate: '',
    blood_oxygen: '',
    temperature: '',
    activity_level: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to add health data.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase
        .from('health_metrics')
        .insert({
          user_id: user.id,
          heart_rate: parseInt(formData.heart_rate),
          blood_oxygen: parseInt(formData.blood_oxygen),
          temperature: parseFloat(formData.temperature),
          activity_level: formData.activity_level,
          timestamp: new Date().toISOString(),
          anomaly: 'false'
        })

      if (error) {
        throw error
      }

      toast({
        title: "Success!",
        description: "Health data has been recorded successfully.",
      })

      // Reset form
      setFormData({
        heart_rate: '',
        blood_oxygen: '',
        temperature: '',
        activity_level: ''
      })

      // Navigate to dashboard
      navigate('/dashboard')
    } catch (error) {
      console.error('Error saving health data:', error)
      toast({
        title: "Error",
        description: "Failed to save health data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-cyan-600" />
              <span>Add Health Data</span>
            </CardTitle>
            <CardDescription>
              Record your current health metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="heart_rate" className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>Heart Rate (bpm)</span>
                  </Label>
                  <Input
                    id="heart_rate"
                    type="number"
                    min="30"
                    max="220"
                    value={formData.heart_rate}
                    onChange={(e) => handleInputChange('heart_rate', e.target.value)}
                    placeholder="72"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="blood_oxygen" className="flex items-center space-x-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span>Blood Oxygen (%)</span>
                  </Label>
                  <Input
                    id="blood_oxygen"
                    type="number"
                    min="70"
                    max="100"
                    value={formData.blood_oxygen}
                    onChange={(e) => handleInputChange('blood_oxygen', e.target.value)}
                    placeholder="98"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="temperature" className="flex items-center space-x-2">
                    <Thermometer className="h-4 w-4 text-orange-500" />
                    <span>Temperature (°C)</span>
                  </Label>
                  <Input
                    id="temperature"
                    type="number"
                    min="35"
                    max="42"
                    step="0.1"
                    value={formData.temperature}
                    onChange={(e) => handleInputChange('temperature', e.target.value)}
                    placeholder="36.5"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activity_level" className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-green-500" />
                    <span>Activity Level (%)</span>
                  </Label>
                  <Input
                    id="activity_level"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.activity_level}
                    onChange={(e) => handleInputChange('activity_level', e.target.value)}
                    placeholder="75"
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? 'Recording...' : 'Record Health Data'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

export default AddHealthData

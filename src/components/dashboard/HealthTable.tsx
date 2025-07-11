
import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { HealthMetric } from '@/lib/supabase'
import { format } from 'date-fns'

interface HealthTableProps {
  metrics: HealthMetric[]
}

export const HealthTable: React.FC<HealthTableProps> = ({ metrics }) => {
  return (
    <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Recent Health Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Heart Rate</TableHead>
                <TableHead>Blood Oxygen</TableHead>
                <TableHead>Temperature</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {metrics.slice(0, 10).map((metric) => (
                <TableRow key={metric.id}>
                  <TableCell className="font-medium">
                    {format(new Date(metric.timestamp), 'MMM dd, HH:mm')}
                  </TableCell>
                  <TableCell>{metric.heart_rate} bpm</TableCell>
                  <TableCell>{metric.blood_oxygen}%</TableCell>
                  <TableCell>{metric.temperature}°C</TableCell>
                  <TableCell>{metric.activity_level}%</TableCell>
                  <TableCell>
                    <Badge 
                      variant={metric.anomaly ? "destructive" : "default"}
                      className="text-xs"
                    >
                      {metric.anomaly ? "Alert" : "Normal"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

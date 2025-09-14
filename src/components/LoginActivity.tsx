import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface LoginData {
  login_date: string;
  student_logins: number;
  company_logins: number;
  total_logins: number;
}

export const LoginActivity = () => {
  const [loginData, setLoginData] = useState<LoginData[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("7");

  useEffect(() => {
    fetchLoginActivity();
  }, [timeframe]);

  const fetchLoginActivity = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.rpc('get_recent_logins', {
        days_back: parseInt(timeframe)
      });
      
      if (error) throw error;
      setLoginData(data || []);
    } catch (error) {
      console.error('Error fetching login activity:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-muted rounded w-1/3"></div>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalStudentLogins = loginData.reduce((sum, day) => sum + day.student_logins, 0);
  const totalCompanyLogins = loginData.reduce((sum, day) => sum + day.company_logins, 0);

  const pieData = [
    { name: 'Students', value: totalStudentLogins, color: '#3b82f6' },
    { name: 'Companies', value: totalCompanyLogins, color: '#10b981' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Login Activity</h3>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Today</SelectItem>
            <SelectItem value="7">7 Days</SelectItem>
            <SelectItem value="30">30 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Login Trends</CardTitle>
            <CardDescription>
              Login activity over the last {timeframe} day{timeframe !== "1" ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={loginData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="login_date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <Bar dataKey="student_logins" fill="#3b82f6" name="Students" />
                <Bar dataKey="company_logins" fill="#10b981" name="Companies" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Type Distribution</CardTitle>
            <CardDescription>
              Login distribution by user type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-sm">Students ({totalStudentLogins})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-sm">Companies ({totalCompanyLogins})</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
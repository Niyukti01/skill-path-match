import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, UserCheck, TrendingUp } from "lucide-react";

interface UserStatistics {
  total_students: number;
  total_companies: number;
  total_users: number;
  students_today: number;
  companies_today: number;
  logins_today: number;
}

export const UserStats = () => {
  const [stats, setStats] = useState<UserStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setError(null);
      const { data, error } = await supabase.rpc('get_user_statistics');
      if (error) throw error;
      
      if (data && data.length > 0) {
        setStats(data[0]);
      }
    } catch (error: any) {
      console.error('Error fetching statistics:', error);
      setError('Failed to load statistics. Please try refreshing the page.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    
    // Set up real-time subscription for profile changes
    const profilesSubscription = supabase
      .channel('profiles-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles'
        },
        (payload) => {
          console.log('Profile change detected:', payload);
          // Refresh stats when profiles change
          fetchStats();
        }
      )
      .subscribe();

    // Set up real-time subscription for login changes
    const loginsSubscription = supabase
      .channel('logins-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'user_logins'
        },
        (payload) => {
          console.log('New login detected:', payload);
          // Refresh stats when new logins occur
          fetchStats();
        }
      )
      .subscribe();

    // Refresh stats every 30 seconds as fallback
    const interval = setInterval(fetchStats, 30000);

    return () => {
      supabase.removeChannel(profilesSubscription);
      supabase.removeChannel(loginsSubscription);
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-muted rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive mb-2">{error}</p>
        <button 
          onClick={fetchStats}
          className="text-primary hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No statistics available</p>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Students",
      value: stats.total_students,
      description: `${stats.students_today} joined today`,
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Total Companies",
      value: stats.total_companies,
      description: `${stats.companies_today} joined today`,
      icon: Building2,
      color: "text-green-600"
    },
    {
      title: "Total Users",
      value: stats.total_users,
      description: "All registered users",
      icon: UserCheck,
      color: "text-purple-600"
    },
    {
      title: "Today's Logins",
      value: stats.logins_today,
      description: "Active users today",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <Card key={index} className="hover-scale transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
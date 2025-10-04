import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  id: string;
  name: string;
  email: string;
  user_type: string;
  role: string;
  created_at: string;
  last_login_at: string;
  login_count: number;
}

interface AdminUserTableProps {
  users: UserData[];
}

export const AdminUserTable = ({ users }: AdminUserTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.user_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportUserData = () => {
    const csvContent = [
      ["Name", "Email", "Type", "Role", "Created At", "Last Login", "Login Count"].join(","),
      ...filteredUsers.map(user => [
        user.name,
        user.email,
        user.user_type,
        user.role,
        new Date(user.created_at).toLocaleDateString(),
        user.last_login_at ? new Date(user.last_login_at).toLocaleDateString() : 'Never',
        user.login_count || 0
      ].join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `internlink-users-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Export successful",
      description: "User data has been exported to CSV file"
    });
  };

  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>All Users</CardTitle>
            <CardDescription>
              Manage registered users ({filteredUsers.length} {searchTerm ? 'found' : 'total'})
            </CardDescription>
          </div>
          <Button onClick={exportUserData} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by name, email, or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Logins</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.slice(0, 10).map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.user_type === 'student' ? 'default' : 'secondary'}>
                        {user.user_type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'admin' ? 'destructive' : 'outline'}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {user.last_login_at 
                        ? new Date(user.last_login_at).toLocaleDateString()
                        : 'Never'
                      }
                    </TableCell>
                    <TableCell>{user.login_count || 0}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        {filteredUsers.length > 10 && (
          <p className="text-sm text-muted-foreground mt-4">
            Showing 10 of {filteredUsers.length} users. Export CSV to see all users.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

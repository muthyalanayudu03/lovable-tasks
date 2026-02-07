import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LayoutDashboard, LogIn, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect to home if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (login(userId, password)) {
      toast({
        title: 'Welcome back!',
        description: 'Successfully logged in to TaskFlow',
      });
      navigate('/');
    } else {
      toast({
        title: 'Login failed',
        description: 'Invalid user ID or password',
        variant: 'destructive',
      });
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-3 sm:p-4"
      style={{
        background: 'linear-gradient(135deg, hsl(224 76% 95%) 0%, hsl(280 60% 95%) 50%, hsl(45 80% 95%) 100%)'
      }}
    >
      <div className="glass-card rounded-xl sm:rounded-2xl p-5 sm:p-8 w-full max-w-md space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/90 text-primary-foreground backdrop-blur-sm">
            <LayoutDashboard className="w-7 h-7" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">TaskFlow</h1>
            <p className="text-sm text-muted-foreground">Sign in to manage your tasks</p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userId">User ID</Label>
            <Input
              id="userId"
              type="text"
              placeholder="Enter your user ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="glass border-white/20"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass border-white/20 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full gap-2">
            <LogIn className="w-4 h-4" />
            Sign In
          </Button>
        </form>

        {/* Demo Credentials */}
        <div className="glass rounded-lg p-4 space-y-2">
          <p className="text-xs font-medium text-muted-foreground text-center">Demo Credentials</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-muted-foreground">User ID:</div>
            <div className="font-mono font-medium text-foreground">todouser</div>
            <div className="text-muted-foreground">Password:</div>
            <div className="font-mono font-medium text-foreground">1234567890</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Users, Globe, TrendingUp } from "lucide-react";
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface RegistrationStats {
  totalRegistrations: number;
  countries: string[];
}

export function RegistrationStats() {
  const [stats, setStats] = useState<RegistrationStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-19150099/stats`, {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          }
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            setStats(result.stats);
          }
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading || !stats) {
    return null;
  }

  // Only show if there are registrations
  if (stats.totalRegistrations === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-green-50 to-emerald-100 rounded-2xl p-6 border border-green-200 mb-8"
    >
      <div className="flex items-center justify-center gap-8 text-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-green-800">
              {stats.totalRegistrations}
            </div>
            <div className="text-sm text-green-600">
              شرکت‌کننده
            </div>
          </div>
        </div>

        <div className="w-px h-12 bg-green-300" />

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-800">
              {stats.countries.filter(country => country !== 'نامشخص').length}
            </div>
            <div className="text-sm text-blue-600">
              کشور مختلف
            </div>
          </div>
        </div>

        <div className="w-px h-12 bg-green-300" />

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-lg font-bold text-orange-800">
              زنده
            </div>
            <div className="text-sm text-orange-600">
              آمار لحظه‌ای
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
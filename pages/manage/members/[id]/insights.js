import React from 'react';
import { useRouter } from 'next/router';
import { Container, Card } from 'react-bootstrap';
import Layout from '@/components/global/layout';
import ManageNav from '@/components/manage/ManageNav';
import { membersData } from '@/data/members';
import styles from '@/styles/manage/Members.module.css';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell,
  LineChart, Line,
  ResponsiveContainer 
} from 'recharts';
import { FaLightbulb, FaTrophy, FaChartLine } from 'react-icons/fa';

// Dummy data for charts
const activityData = {
  thisYear: {
    runs: 45,
    rides: 30,
    swims: 15
  },
  total: {
    runs: 120,
    rides: 85,
    swims: 40
  },
  monthlyActivities: [
    { month: 'Jan', activities: 8 },
    { month: 'Feb', activities: 12 },
    { month: 'Mar', activities: 15 },
    { month: 'Apr', activities: 10 },
    { month: 'May', activities: 14 },
    { month: 'Jun', activities: 18 },
  ],
  activityTypes: [
    { name: 'Running', value: 45 },
    { name: 'Cycling', value: 30 },
    { name: 'Swimming', value: 15 },
  ],
  improvements: [
    { month: 'Jan', speed: 5.2 },
    { month: 'Feb', speed: 5.5 },
    { month: 'Mar', speed: 5.8 },
    { month: 'Apr', speed: 6.1 },
    { month: 'May', speed: 6.4 },
    { month: 'Jun', speed: 6.8 },
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export default function MemberInsightsPage() {
  const router = useRouter();
  const { id } = router.query;
  const member = membersData.find(m => m.id === Number(id));

  if (!member) {
    return null;
  }

  return (
    <Layout title={`${member.name}'s Insights`}>
      <Container className="py-5">
        <ManageNav />
        <div className={styles.headerSection}>
          <h1 className={styles.pageTitle}>{member.name}'s Insights</h1>
        </div>

        {/* Activity Stats */}
        <div className={styles.insightsGrid}>
          <Card className={styles.statCard}>
            <h3>This Year</h3>
            <div>
              <p>🏃‍♂️ {activityData.thisYear.runs} Runs</p>
              <p>🚴‍♂️ {activityData.thisYear.rides} Rides</p>
              <p>🏊‍♂️ {activityData.thisYear.swims} Swims</p>
            </div>
          </Card>

          <Card className={styles.statCard}>
            <h3>All Time</h3>
            <div>
              <p>🏃‍♂️ {activityData.total.runs} Runs</p>
              <p>🚴‍♂️ {activityData.total.rides} Rides</p>
              <p>🏊‍♂️ {activityData.total.swims} Swims</p>
            </div>
          </Card>

          <Card className={styles.statCard}>
            <h3>Recent Achievement</h3>
            <div>
              <p>🏆 Longest Run: 15km</p>
              <p>⚡ Fastest 5K: 22min</p>
              <p>🎯 Monthly Goal: 85%</p>
            </div>
          </Card>

          {/* Monthly Activities Chart */}
          <Card className={styles.chartCard}>
            <h3>Monthly Activities</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activityData.monthlyActivities}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="activities" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Activity Distribution */}
          <Card className={styles.chartCard}>
            <h3>Activity Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={activityData.activityTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {activityData.activityTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Performance Improvement */}
          <Card className={styles.chartCard}>
            <h3>Running Speed Improvement</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activityData.improvements}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="speed" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* AI Generated Insights */}
        <section className={styles.aiInsights}>
          <h3>AI Insights</h3>
          <div className={styles.insightComment}>
            <FaLightbulb className={styles.insightIcon} />
            <p className={styles.insightText}>
              Your running speed has shown consistent improvement over the last 6 months, 
              with a 30% increase in average pace. Keep up the great progress!
            </p>
          </div>
          <div className={styles.insightComment}>
            <FaTrophy className={styles.insightIcon} />
            <p className={styles.insightText}>
              You've achieved your personal best in cycling distance this month. 
              Consider setting a new challenge goal for next month.
            </p>
          </div>
          <div className={styles.insightComment}>
            <FaChartLine className={styles.insightIcon} />
            <p className={styles.insightText}>
              Your activity consistency has improved significantly. You're now averaging 
              15 activities per month, up from 8 at the start of the year.
            </p>
          </div>
        </section>
      </Container>
    </Layout>
  );
}

import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import { Package, Users, TrendingUp, DollarSign } from 'lucide-react'

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalSales: 0,
    totalRevenue: 0
  })

  useEffect(() => {
    // Fetch dashboard stats
    // This would be replaced with actual API calls
    setStats({
      totalProducts: 156,
      totalCategories: 12,
      totalSales: 2847,
      totalRevenue: 45678.90
    })
  }, [])

  const statCards = [
    {
      title: 'Total de Produtos',
      value: stats.totalProducts,
      icon: Package,
      color: 'blue',
      change: '+12%'
    },
    {
      title: 'Categorias',
      value: stats.totalCategories,
      icon: Users,
      color: 'green',
      change: '+5%'
    },
    {
      title: 'Vendas',
      value: stats.totalSales,
      icon: TrendingUp,
      color: 'purple',
      change: '+18%'
    },
    {
      title: 'Receita',
      value: `R$ ${stats.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: 'yellow',
      change: '+25%'
    }
  ]

  const getIconColor = (color) => {
    switch (color) {
      case 'blue': return 'text-blue-400'
      case 'green': return 'text-green-400'
      case 'purple': return 'text-purple-400'
      case 'yellow': return 'text-yellow-400'
      default: return 'text-blue-400'
    }
  }

  return (
    <div className="flex min-h-screen tower-bg">
      <Sidebar user={user} />
      
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Visão geral do seu negócio</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="tower-card rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gray-800`}>
                    <IconComponent className={`h-6 w-6 ${getIconColor(stat.color)}`} />
                  </div>
                  <span className="text-green-400 text-sm font-medium">{stat.change}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-gray-400 text-sm">{stat.title}</p>
              </div>
            )
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Chart */}
          <div className="tower-card rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Vendas por Mês</h3>
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-400">Gráfico de vendas será implementado aqui</p>
            </div>
          </div>

          {/* Products Chart */}
          <div className="tower-card rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Produtos por Categoria</h3>
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-400">Gráfico de produtos será implementado aqui</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="tower-card rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Atividade Recente</h3>
          <div className="space-y-4">
            {[
              { action: 'Produto adicionado', item: 'Produto XYZ', time: '2 horas atrás' },
              { action: 'Categoria criada', item: 'Nova Categoria', time: '4 horas atrás' },
              { action: 'Relatório gerado', item: 'Relatório Mensal', time: '1 dia atrás' },
              { action: 'Usuário logado', item: 'Sistema', time: '2 dias atrás' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0">
                <div>
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-gray-400 text-sm">{activity.item}</p>
                </div>
                <span className="text-gray-500 text-sm">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

import { useNavigate, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Package, 
  BarChart3, 
  FileText, 
  Settings, 
  Users, 
  BookOpen, 
  HelpCircle,
  LogOut
} from 'lucide-react'
import towerLogo from '../assets/LOGOTOWER.png'

const Sidebar = ({ user }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    {
      title: 'Funcionalidades',
      items: [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: Package, label: 'Cadastramento', path: '/cadastro' },
        { icon: BarChart3, label: 'Síntese', path: '/sintese' },
        { icon: FileText, label: 'Ficha Técnica', path: '/ficha-tecnica' }
      ]
    },
    {
      title: 'Mind Estrategos',
      items: [
        { icon: Settings, label: 'Integrações', path: '/integracoes' },
        { icon: BookOpen, label: 'Aprendizado', path: '/aprendizado' },
        { icon: HelpCircle, label: 'Suporte', path: '/suporte' },
        { icon: Settings, label: 'Configurações', path: '/configuracoes' }
      ]
    }
  ]

  const handleLogout = () => {
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  return (
    <div className="tower-sidebar w-64 min-h-screen p-4">
      {/* Logo */}
      <div className="flex items-center mb-8">
        <img src={towerLogo} alt="Tower Logo" className="h-8 mr-3 tower-logo" />
        <span className="text-xl font-bold text-white">TOWER</span>
      </div>

      {/* Menu Items */}
      <nav className="space-y-6">
        {menuItems.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item, itemIndex) => {
                const IconComponent = item.icon
                return (
                  <li key={itemIndex}>
                    <button
                      onClick={() => navigate(item.path)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-all ${
                        isActive(item.path)
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      <IconComponent className="h-5 w-5 mr-3" />
                      {item.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User Info */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="tower-card rounded-lg p-3 flex items-center">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
            <Users className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Nome do usuário</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar

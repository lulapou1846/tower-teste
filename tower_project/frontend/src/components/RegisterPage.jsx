import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Building, FileText, Mail, Lock } from 'lucide-react'
import towerLogo from '../assets/LOGOTOWER.png'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    cnpj: '',
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        alert('Cadastro realizado com sucesso!')
        navigate('/plans')
      } else {
        alert(data.message)
      }
    } catch (error) {
      alert('Erro ao realizar cadastro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center tower-bg">
      <div className="tower-card rounded-lg p-8 w-full max-w-md mx-4">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={towerLogo} alt="Tower Logo" className="h-16 tower-logo" />
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Criar Conta</h1>
          <p className="text-gray-400">Cadastre sua empresa no Tower</p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nome da Empresa
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                name="company_name"
                placeholder="Nome da sua empresa"
                value={formData.company_name}
                onChange={handleChange}
                className="tower-input pl-10 h-12"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              CNPJ
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                name="cnpj"
                placeholder="00.000.000/0000-00"
                value={formData.cnpj}
                onChange={handleChange}
                className="tower-input pl-10 h-12"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              E-mail
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="email"
                name="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                className="tower-input pl-10 h-12"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="password"
                name="password"
                placeholder="Crie uma senha"
                value={formData.password}
                onChange={handleChange}
                className="tower-input pl-10 h-12"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="tower-button w-full h-12 text-lg font-semibold"
            disabled={loading}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </Button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-gray-400">
            Já tem uma conta?{' '}
            <button
              onClick={() => navigate('/')}
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Fazer login
            </button>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          ©2025 Estrategos | Todos os direitos reservados
        </div>
      </div>
    </div>
  )
}

export default RegisterPage

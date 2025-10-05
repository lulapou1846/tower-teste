import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Crown, Zap, Building2 } from 'lucide-react'
import towerLogo from '../assets/LOGOTOWER.png'

const PlansPage = () => {
  const [billingType, setBillingType] = useState('monthly')
  const [plansData, setPlansData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('http://localhost:5000/plans')
        if (response.ok) {
          const data = await response.json()
          setPlansData(data)
        } else {
          alert('Erro ao carregar planos.')
        }
      } catch (error) {
        console.error('Erro ao buscar planos:', error)
        alert('Erro ao conectar com o servidor de planos.')
      }
    }
    fetchPlans()
  }, [])

  const handleSelectPlan = async (planId, billingType) => {
    const selectedPlan = plansData.find(p => p.id === planId)
    if (!selectedPlan) {
      alert('Plano não encontrado.')
      return
    }

    if (selectedPlan.name === 'Enterprise') {
      alert('Entre em contato conosco para o plano Enterprise')
      return
    }

    try {
      const response = await fetch('http://localhost:5000/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan_id: planId, billing_type: billingType }),
      })

      const data = await response.json()

      if (response.ok) {
        window.location.href = data.checkout_url // Redirect to Stripe Checkout
      } else {
        alert(data.error || 'Erro ao iniciar o checkout.')
      }
    } catch (error) {
      console.error('Erro ao criar sessão de checkout:', error)
      alert('Erro ao processar o pagamento.')
    }
  }

  const getIconColor = (color) => {
    switch (color) {
      case 'blue': return 'text-blue-400'
      case 'yellow': return 'text-yellow-400'
      case 'red': return 'text-red-400'
      default: return 'text-blue-400'
    }
  }

  const getCardColor = (planName) => {
    if (planName === 'PRO') return 'tower-pricing-card popular'
    return 'tower-pricing-card'
  }

  const getPlanDetails = (plan) => {
    const price = billingType === 'monthly' ? plan.price_monthly : plan.price_annually
    const period = billingType === 'monthly' ? 'mês' : 'ano'
    const displayPrice = plan.name === 'Enterprise' ? 'Fale conosco' : `R$ ${price.toFixed(2).replace('.', ',')}`
    const iconColor = plan.name === 'Plano Essencial' ? 'blue' : (plan.name === 'PRO' ? 'yellow' : 'red')
    const IconComponent = Crown // Using Crown for all as per image

    return {
      displayPrice,
      period,
      iconColor,
      IconComponent,
      features: [
        'Funcionalidades básicas',
        'Suporte por email',
        'Dashboard completo',
        ...(plan.name === 'PRO' || plan.name === 'Enterprise' ? ['Relatórios avançados', 'Integrações'] : []),
        ...(plan.name === 'Enterprise' ? ['Solução personalizada', 'Suporte dedicado', 'Treinamento incluso', 'SLA garantido'] : [])
      ]
    }
  }

  return (
    <div className="min-h-screen tower-bg py-12">
      <div className="container mx-auto px-4">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <img src={towerLogo} alt="Tower Logo" className="h-20 tower-logo" />
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="tower-card rounded-lg p-2 flex">
            <button
              onClick={() => setBillingType('monthly')}
              className={`px-6 py-2 rounded-md transition-all ${
                billingType === 'monthly' 
                  ? 'tower-button' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Mensalmente
            </button>
            <button
              onClick={() => setBillingType('annually')}
              className={`px-6 py-2 rounded-md transition-all ${
                billingType === 'annually' 
                  ? 'tower-button' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Anualmente
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plansData.map((plan) => {
            const { displayPrice, period, iconColor, IconComponent, features } = getPlanDetails(plan)
            return (
              <div
                key={plan.id}
                className={`${getCardColor(plan.name)} rounded-lg p-8 text-center relative`}
              >
                {plan.name === 'PRO' && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                      Mais popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <IconComponent className={`h-16 w-16 mx-auto ${getIconColor(iconColor)}`} />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>

                <div className="mb-6">
                  {plan.name !== 'Enterprise' ? (
                    <>
                      <span className="text-4xl font-bold text-white">
                        {displayPrice}
                      </span>
                      <span className="text-gray-400 ml-2">
                        por {period}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-white">{displayPrice}</span>
                  )}
                </div>

                <Button
                  onClick={() => handleSelectPlan(plan.id, billingType)}
                  className={`tower-button w-full mb-6 ${
                    plan.name === 'Enterprise' ? 'bg-gray-600 hover:bg-gray-700' : ''
                  }`}
                >
                  {plan.name === 'Enterprise' ? 'Fale conosco' : 'Assinar'}
                </Button>

                <ul className="text-left space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="text-gray-300 flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Back to Login */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/')}
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Voltar ao login
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlansPage

import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import { Button } from '@/components/ui/button'
import { BarChart3, TrendingUp, Edit } from 'lucide-react'

const SintesePage = ({ user }) => {
  const [salesData, setSalesData] = useState([])
  const [totalSales, setTotalSales] = useState(0)
  const [activeCategories, setActiveCategories] = useState(0)

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockData = [
      {
        category: 'CATEGORIA A',
        products: [
          {
            name: 'Nome do produto',
            cmvCpvCsv: 'R$ 0,00',
            sellPrice: 'R$ 0,00',
            productMargin: 'R$ 0,00',
            performance: '%',
            sales: 0,
            totalSales: 'R$ 0,00',
            margin: '%',
            cmvCpvCsvProduct: '%',
            performanceProduct: '%'
          },
          {
            name: 'Nome do produto',
            cmvCpvCsv: 'R$ 0,00',
            sellPrice: 'R$ 0,00',
            productMargin: 'R$ 0,00',
            performance: '%',
            sales: 0,
            totalSales: 'R$ 0,00',
            margin: '%',
            cmvCpvCsvProduct: '%',
            performanceProduct: '%'
          },
          {
            name: 'Nome do produto',
            cmvCpvCsv: 'R$ 0,00',
            sellPrice: 'R$ 0,00',
            productMargin: 'R$ 0,00',
            performance: '%',
            sales: 0,
            totalSales: 'R$ 0,00',
            margin: '%',
            cmvCpvCsvProduct: '%',
            performanceProduct: '%'
          }
        ],
        total: {
          cmvCpvCsv: 'R$ 0,00',
          sales: 0,
          totalSales: 'R$ 0,00',
          margin: 'R$ 0,00',
          cmvCpvCsvProduct: 'R$ 0,00',
          performanceProduct: 'R$ 0,00'
        }
      },
      {
        category: 'CATEGORIA B',
        products: [
          {
            name: 'Nome do produto',
            cmvCpvCsv: 'R$ 0,00',
            sellPrice: 'R$ 0,00',
            productMargin: 'R$ 0,00',
            performance: '%',
            sales: 0,
            totalSales: 'R$ 0,00',
            margin: '%',
            cmvCpvCsvProduct: '%',
            performanceProduct: '%'
          },
          {
            name: 'Nome do produto',
            cmvCpvCsv: 'R$ 0,00',
            sellPrice: 'R$ 0,00',
            productMargin: 'R$ 0,00',
            performance: '%',
            sales: 0,
            totalSales: 'R$ 0,00',
            margin: '%',
            cmvCpvCsvProduct: '%',
            performanceProduct: '%'
          },
          {
            name: 'Nome do produto',
            cmvCpvCsv: 'R$ 0,00',
            sellPrice: 'R$ 0,00',
            productMargin: 'R$ 0,00',
            performance: '%',
            sales: 0,
            totalSales: 'R$ 0,00',
            margin: '%',
            cmvCpvCsvProduct: '%',
            performanceProduct: '%'
          }
        ],
        total: {
          cmvCpvCsv: 'R$ 0,00',
          sales: 0,
          totalSales: 'R$ 0,00',
          margin: 'R$ 0,00',
          cmvCpvCsvProduct: 'R$ 0,00',
          performanceProduct: 'R$ 0,00'
        }
      }
    ]
    
    setSalesData(mockData)
    setTotalSales(0)
    setActiveCategories(2)
  }, [])

  return (
    <div className="flex min-h-screen tower-bg">
      <Sidebar user={user} />
      
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">SÍNTESE</h1>
          <p className="text-gray-400">Análise consolidada de vendas por categoria</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="tower-card rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-red-600">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">SÍNTESE DA PRECIFICAÇÃO</h3>
            <p className="text-gray-400 text-sm">Análise consolidada de vendas por categoria</p>
          </div>

          <div className="tower-card rounded-lg p-6 text-center">
            <h3 className="text-3xl font-bold text-green-400 mb-2">{totalSales}</h3>
            <p className="text-gray-400">TOTAL DE VENDAS</p>
          </div>

          <div className="tower-card rounded-lg p-6 text-center">
            <h3 className="text-3xl font-bold text-blue-400 mb-2">{activeCategories}</h3>
            <p className="text-gray-400">CATEGORIAS ATIVAS</p>
          </div>
        </div>

        {/* Sales Data Tables */}
        <div className="space-y-8">
          {salesData.map((categoryData, categoryIndex) => (
            <div key={categoryIndex} className="tower-card rounded-lg p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-blue-400 text-center mb-4">
                  {categoryData.category}
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full tower-table text-sm">
                  <thead>
                    <tr>
                      <th className="text-left p-2 text-gray-300">PRODUTOS</th>
                      <th className="text-center p-2 text-gray-300">CMV/CPV/CSV</th>
                      <th className="text-center p-2 text-gray-300">PREÇO DE VENDA DO PRODUTO</th>
                      <th className="text-center p-2 text-gray-300">MARGEM DO PRODUTO</th>
                      <th className="text-center p-2 text-gray-300">DESEMPENHO DO PRODUTO</th>
                      <th className="text-center p-2 text-gray-300">VENDAS</th>
                      <th className="text-center p-2 text-gray-300">TOTAL DE VENDAS DO PRODUTO</th>
                      <th className="text-center p-2 text-gray-300">MARGEM</th>
                      <th className="text-center p-2 text-gray-300">CMV/CPV/CSV DO PRODUTO</th>
                      <th className="text-center p-2 text-gray-300">DESEMPENHO DO PRODUTO</th>
                      <th className="text-center p-2 text-gray-300">AÇÕES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryData.products.map((product, productIndex) => (
                      <tr key={productIndex} className="hover:bg-gray-700">
                        <td className="p-2 text-white">{product.name}</td>
                        <td className="p-2 text-white text-center">{product.cmvCpvCsv}</td>
                        <td className="p-2 text-white text-center">{product.sellPrice}</td>
                        <td className="p-2 text-white text-center">{product.productMargin}</td>
                        <td className="p-2 text-white text-center">{product.performance}</td>
                        <td className="p-2 text-white text-center">{product.sales}</td>
                        <td className="p-2 text-white text-center">{product.totalSales}</td>
                        <td className="p-2 text-white text-center">{product.margin}</td>
                        <td className="p-2 text-white text-center">{product.cmvCpvCsvProduct}</td>
                        <td className="p-2 text-white text-center">{product.performanceProduct}</td>
                        <td className="p-2 text-center">
                          <Button size="sm" variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-600">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    
                    {/* Total Row */}
                    <tr className="bg-gray-800 font-bold">
                      <td className="p-2 text-white">TOTAL</td>
                      <td className="p-2 text-white text-center">{categoryData.total.cmvCpvCsv}</td>
                      <td className="p-2 text-white text-center">-</td>
                      <td className="p-2 text-white text-center">-</td>
                      <td className="p-2 text-white text-center">-</td>
                      <td className="p-2 text-white text-center">{categoryData.total.sales}</td>
                      <td className="p-2 text-white text-center">{categoryData.total.totalSales}</td>
                      <td className="p-2 text-white text-center">{categoryData.total.margin}</td>
                      <td className="p-2 text-white text-center">{categoryData.total.cmvCpvCsvProduct}</td>
                      <td className="p-2 text-white text-center">{categoryData.total.performanceProduct}</td>
                      <td className="p-2 text-center">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SintesePage

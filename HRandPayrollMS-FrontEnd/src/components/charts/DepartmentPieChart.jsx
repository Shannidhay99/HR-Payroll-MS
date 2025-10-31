import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const DepartmentPieChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  
  useEffect(() => {
    // Initialize chart
    if (!chartInstance.current && chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current, null, {
        renderer: 'canvas',
        useDirtyRect: false
      });
    }

    const option = {
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        borderRadius: 12,
        padding: [12, 16],
        textStyle: {
          color: '#374151',
          fontSize: 13,
          fontFamily: 'Inter, system-ui, sans-serif'
        },
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowBlur: 20,
        shadowOffsetY: 4,
        formatter: function(params) {
          const employeeCount = Math.round(params.value * 1.25);
          return `
            <div style="display: flex; align-items: center; margin-bottom: 8px;">
              <div style="width: 12px; height: 12px; background: ${params.color}; border-radius: 6px; margin-right: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></div>
              <span style="font-weight: 600; font-size: 14px; color: #1F2937;">${params.name}</span>
            </div>
            <div style="margin-left: 20px;">
              <div style="margin: 2px 0; color: #374151;"><strong>${params.value}%</strong> of total workforce</div>
              <div style="margin: 2px 0; color: #6B7280;">${employeeCount} employees</div>
            </div>
          `;
        }
      },
      legend: {
        data: ['Engineering', 'Sales', 'Marketing', 'HR', 'Others'],
        bottom: '20px',
        left: 'center',
        textStyle: {
          color: '#4B5563',
          fontSize: 13,
          fontWeight: '500',
          fontFamily: 'Inter, system-ui, sans-serif'
        },
        itemWidth: 16,
        itemHeight: 16,
        itemGap: 25,
        padding: [15, 0, 0, 0]
      },
      series: [
        {
          name: 'Departments',
          type: 'pie',
          radius: ['35%', '65%'],
          center: ['50%', '40%'],
          startAngle: 90,
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 8,
            borderColor: '#fff',
            borderWidth: 2,
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 4
          },
          label: {
            show: false
          },
          emphasis: {
            scale: true,
            scaleSize: 5,
            itemStyle: {
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 15,
              shadowOffsetY: 8
            }
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function () {
            return Math.random() * 200;
          },
          labelLine: {
            show: false
          },
          data: [
            { 
              value: 40, 
              name: 'Engineering', 
              itemStyle: { 
                color: {
                  type: 'linear',
                  x: 0, y: 0, x2: 1, y2: 1,
                  colorStops: [
                    { offset: 0, color: '#60A5FA' },
                    { offset: 1, color: '#3B82F6' }
                  ]
                }
              }
            },
            { 
              value: 20, 
              name: 'Sales', 
              itemStyle: { 
                color: {
                  type: 'linear',
                  x: 0, y: 0, x2: 1, y2: 1,
                  colorStops: [
                    { offset: 0, color: '#34D399' },
                    { offset: 1, color: '#10B981' }
                  ]
                }
              }
            },
            { 
              value: 15, 
              name: 'Marketing', 
              itemStyle: { 
                color: {
                  type: 'linear',
                  x: 0, y: 0, x2: 1, y2: 1,
                  colorStops: [
                    { offset: 0, color: '#A78BFA' },
                    { offset: 1, color: '#8B5CF6' }
                  ]
                }
              }
            },
            { 
              value: 13, 
              name: 'HR', 
              itemStyle: { 
                color: {
                  type: 'linear',
                  x: 0, y: 0, x2: 1, y2: 1,
                  colorStops: [
                    { offset: 0, color: '#FBBF24' },
                    { offset: 1, color: '#F59E0B' }
                  ]
                }
              }
            },
            { 
              value: 12, 
              name: 'Others', 
              itemStyle: { 
                color: {
                  type: 'linear',
                  x: 0, y: 0, x2: 1, y2: 1,
                  colorStops: [
                    { offset: 0, color: '#9CA3AF' },
                    { offset: 1, color: '#6B7280' }
                  ]
                }
              }
            }
          ]
        }
      ]
    };

    // Set chart option
    if (chartInstance.current) {
      chartInstance.current.setOption(option);
    }

    // Handle resize
    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 h-full transition-all duration-500 hover:shadow-2xl hover:border-gray-300 hover:-translate-y-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">Department Analytics</h3>
          <p className="text-sm text-gray-600">Workforce distribution insights</p>
        </div>
        <div className="text-right bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-4 border border-blue-200">
          <div className="text-3xl font-bold text-blue-700 mb-1">125</div>
          <div className="text-xs font-medium text-blue-600">Total Staff</div>
        </div>
      </div>
      <div
        ref={chartRef}
        style={{ width: '100%', height: '380px', minHeight: '380px' }}
        className="transition-all duration-500 hover:scale-[1.02]"
      />
    </div>
  );
};

export default DepartmentPieChart;

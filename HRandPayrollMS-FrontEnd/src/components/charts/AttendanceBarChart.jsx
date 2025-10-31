import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const AttendanceBarChart = () => {
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
      legend: {
        data: ['Present', 'Absent', 'On Leave'],
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
        padding: [15, 0, 0, 0],
        formatter: function(name) {
          const icons = {
            'Present': '✓',
            'Absent': '✕',
            'On Leave': '◐'
          };
          return `${icons[name] || ''} ${name}`;
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          shadowStyle: {
            color: 'rgba(0,0,0,0.08)',
            shadowBlur: 10
          }
        },
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
          let total = 0;
          params.forEach(item => total += item.value);
          
          let result = `<div style="font-weight: 700; margin-bottom: 8px; font-size: 14px; color: #1F2937;">${params[0].axisValue}</div>`;
          result += `<div style="margin-bottom: 8px; font-size: 12px; color: #6B7280;">Total: ${total} employees</div>`;
          
          params.forEach(item => {
            const percentage = ((item.value / total) * 100).toFixed(1);
            result += `<div style="display: flex; align-items: center; justify-content: space-between; margin: 6px 0; padding: 4px 0;">
              <div style="display: flex; align-items: center;">
                <div style="width: 12px; height: 12px; background: ${item.color}; border-radius: 6px; margin-right: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></div>
                <span style="font-weight: 500; color: #374151;">${item.seriesName}</span>
              </div>
              <div style="text-align: right;">
                <div style="font-weight: 600; color: #1F2937;">${item.value}</div>
                <div style="font-size: 11px; color: #6B7280;">${percentage}%</div>
              </div>
            </div>`;
          });
          return result;
        }
      },
      grid: {
        left: '60px',
        right: '30px',
        bottom: '80px',
        top: '40px',
        containLabel: true
      },
      dataset: {
        source: [
          ['day', 'Present', 'Absent', 'On Leave'],
          ['Monday', 109, 10, 6],
          ['Tuesday', 110, 13, 2],
          ['Wednesday', 100, 24, 1],
          ['Thursday', 90, 20, 15],
          ['Friday', 95, 27, 3],
          ['Saturday', 45, 5, 8]
        ]
      },
      xAxis: {
        type: 'category',
        axisTick: { 
          alignWithLabel: true,
          lineStyle: { color: '#E5E7EB', width: 1 }
        },
        axisLine: {
          lineStyle: { color: '#E5E7EB', width: 1 }
        },
        axisLabel: {
          color: '#4B5563',
          fontSize: 12,
          fontWeight: '500',
          fontFamily: 'Inter, system-ui, sans-serif',
          margin: 12
        }
      },
      yAxis: {
        type: 'value',
        name: 'Employees',
        nameTextStyle: {
          color: '#6B7280',
          fontSize: 12,
          fontWeight: '500',
          padding: [0, 0, 0, -30]
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#6B7280',
          fontSize: 12,
          fontFamily: 'Inter, system-ui, sans-serif'
        },
        splitLine: {
          lineStyle: {
            color: '#F3F4F6',
            type: 'dashed',
            width: 1
          }
        }
      },
      series: [
        { 
          name: 'Present',
          type: 'bar',
          barWidth: '70%',
          itemStyle: { 
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: '#31e6a3ff' },
                { offset: 0.7, color: '#18cc87ff' },
                { offset: 1, color: '#047857' }
              ]
            },
            borderRadius: [6, 6, 0, 0],
            shadowColor: 'rgba(16, 185, 129, 0.3)',
            shadowBlur: 8,
            shadowOffsetY: 4
          },
          emphasis: {
            itemStyle: { 
              shadowColor: 'rgba(16, 185, 129, 0.5)',
              shadowBlur: 15,
              shadowOffsetY: 8
            }
          },
          animationDelay: function (idx) {
            return idx * 100;
          }
        },
        { 
          name: 'Absent',
          type: 'bar',
          barWidth: '70%',
          itemStyle: { 
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: '#F87171' },
                { offset: 0.7, color: '#EF4444' },
                { offset: 1, color: '#DC2626' }
              ]
            },
            borderRadius: [6, 6, 0, 0],
            shadowColor: 'rgba(239, 68, 68, 0.3)',
            shadowBlur: 8,
            shadowOffsetY: 4
          },
          emphasis: {
            itemStyle: { 
              shadowColor: 'rgba(239, 68, 68, 0.5)',
              shadowBlur: 15,
              shadowOffsetY: 8
            }
          },
          animationDelay: function (idx) {
            return idx * 100 + 50;
          }
        },
        { 
          name: 'On Leave',
          type: 'bar',
          barWidth: '70%',
          itemStyle: { 
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: '#FBBF24' },
                { offset: 0.7, color: '#F59E0B' },
                { offset: 1, color: '#D97706' }
              ]
            },
            borderRadius: [6, 6, 0, 0],
            shadowColor: 'rgba(245, 158, 11, 0.3)',
            shadowBlur: 8,
            shadowOffsetY: 4
          },
          emphasis: {
            itemStyle: { 
              shadowColor: 'rgba(245, 158, 11, 0.5)',
              shadowBlur: 15,
              shadowOffsetY: 8
            }
          },
          animationDelay: function (idx) {
            return idx * 100 + 100;
          }
        }
      ],
      animationEasing: 'elasticOut',
      animationDuration: 1000
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
          <h3 className="text-xl font-bold text-gray-900 mb-1">Attendance Analytics</h3>
          <p className="text-sm text-gray-600">Real-time workforce tracking</p>
        </div>
        <div className="text-right bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-4 border border-green-200">
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-green-700">Live</span>
          </div>
          <div className="text-2xl font-bold text-green-700">98.2%</div>
          <div className="text-xs font-medium text-green-600">Weekly Avg</div>
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

export default AttendanceBarChart;

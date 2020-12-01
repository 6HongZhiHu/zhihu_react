import React, { Component } from 'react'
import {
  Icon,
  Card,
  Statistic,
  DatePicker,
  Timeline
} from 'antd'
import moment from 'moment'


import Bar from './bar'
import './home.less'
import ReactEcharts from 'echarts-for-react'

const dateFormat = 'YYYY/MM/DD'
const { RangePicker } = DatePicker

var colors = ['#FFAE57', '#FF7853', '#EA5151', '#CC3F57', '#9A2555'];
var bgColor = '#2E2733';

var itemStyle = {
  star5: {
    color: colors[0]
  },
  star4: {
    color: colors[1]
  },
  star3: {
    color: colors[2]
  },
  star2: {
    color: colors[3]
  }
};

var data = [{
  name: '虚构',
  itemStyle: {
    color: colors[1]
  },
  children: [{
    name: '小说',
    children: [{
      name: '5☆',
      children: [{
        name: '疼'
      }, {
        name: '慈悲'
      }, {
        name: '楼下的房客'
      }]
    }, {
      name: '4☆',
      children: [{
        name: '虚无的十字架'
      }, {
        name: '无声告白'
      }, {
        name: '童年的终结'
      }]
    }, {
      name: '3☆',
      children: [{
        name: '疯癫老人日记'
      }]
    }]
  }, {
    name: '其他',
    children: [{
      name: '5☆',
      children: [{
        name: '纳博科夫短篇小说全集'
      }]
    }, {
      name: '4☆',
      children: [{
        name: '安魂曲'
      }, {
        name: '人生拼图版'
      }]
    }, {
      name: '3☆',
      children: [{
        name: '比起爱你，我更需要你'
      }]
    }]
  }]
}, {
  name: '非虚构',
  itemStyle: {
    color: colors[2]
  },
  children: [{
    name: '设计',
    children: [{
      name: '5☆',
      children: [{
        name: '无界面交互'
      }]
    }, {
      name: '4☆',
      children: [{
        name: '数字绘图的光照与渲染技术'
      }, {
        name: '日本建筑解剖书'
      }]
    }, {
      name: '3☆',
      children: [{
        name: '奇幻世界艺术\n&RPG地图绘制讲座'
      }]
    }]
  }, {
    name: '社科',
    children: [{
      name: '5☆',
      children: [{
        name: '痛点'
      }]
    }, {
      name: '4☆',
      children: [{
        name: '卓有成效的管理者'
      }, {
        name: '进化'
      }, {
        name: '后物欲时代的来临',
      }]
    }, {
      name: '3☆',
      children: [{
        name: '疯癫与文明'
      }]
    }]
  }, {
    name: '心理',
    children: [{
      name: '5☆',
      children: [{
        name: '我们时代的神经症人格'
      }]
    }, {
      name: '4☆',
      children: [{
        name: '皮格马利翁效应'
      }, {
        name: '受伤的人'
      }]
    }, {
      name: '3☆',
    }, {
      name: '2☆',
      children: [{
        name: '迷恋'
      }]
    }]
  }, {
    name: '居家',
    children: [{
      name: '4☆',
      children: [{
        name: '把房子住成家'
      }, {
        name: '只过必要生活'
      }, {
        name: '北欧简约风格'
      }]
    }]
  }, {
    name: '绘本',
    children: [{
      name: '5☆',
      children: [{
        name: '设计诗'
      }]
    }, {
      name: '4☆',
      children: [{
        name: '假如生活糊弄了你'
      }, {
        name: '博物学家的神秘动物图鉴'
      }]
    }, {
      name: '3☆',
      children: [{
        name: '方向'
      }]
    }]
  }, {
    name: '哲学',
    children: [{
      name: '4☆',
      children: [{
        name: '人生的智慧'
      }]
    }]
  }, {
    name: '技术',
    children: [{
      name: '5☆',
      children: [{
        name: '代码整洁之道'
      }]
    }, {
      name: '4☆',
      children: [{
        name: 'Three.js 开发指南'
      }]
    }]
  }]
}];



export default class Home extends Component {

  state = {
    isVisited: true
  }

  handleChange = (isVisited) => {
    return () => this.setState({ isVisited })
  }
  getOption = ()=>{
    return {
      backgroundColor: bgColor,
      color: colors,
      series: [{
        type: 'sunburst',
        center: ['50%', '48%'],
        data: data,
        sort: function (a, b) {
          if (a.depth === 1) {
            return b.getValue() - a.getValue();
          }
          else {
            return a.dataIndex - b.dataIndex;
          }
        },
        label: {
          rotate: 'radial',
          color: bgColor
        },
        itemStyle: {
          borderColor: bgColor,
          borderWidth: 2
        },
        levels: [{}, {
          r0: 0,
          r: 40,
          label: {
            rotate: 0
          }
        }, {
          r0: 40,
          r: 105
        }, {
          r0: 115,
          r: 140,
          itemStyle: {
            shadowBlur: 2,
            shadowColor: colors[2],
            color: 'transparent'
          },
          label: {
            rotate: 'tangential',
            fontSize: 10,
            color: colors[0]
          }
        }, {
          r0: 140,
          r: 145,
          itemStyle: {
            shadowBlur: 80,
            shadowColor: colors[0]
          },
          label: {
            position: 'outside',
            textShadowBlur: 5,
            textShadowColor: '#333',
          },
          downplay: {
            label: {
              opacity: 0.5
            }
          }
        }]
      }]
    }
  }

  render() {
    const { isVisited } = this.state
    for (var j = 0; j < data.length; ++j) {
      var level1 = data[j].children;
      for (var i = 0; i < level1.length; ++i) {
        var block = level1[i].children;
        var bookScore = [];
        var bookScoreId;
        for (var star = 0; star < block.length; ++star) {
          let style = (function (name) {
            
            switch (name) {
              case '5☆': {
                bookScoreId = 0;
                return itemStyle.star5;
              }
              case '4☆': {
                bookScoreId = 1;
                return itemStyle.star4;
              }
              case '3☆': {
                bookScoreId = 2;
                return itemStyle.star3;
              }
              case '2☆': {
                bookScoreId = 3;
                return itemStyle.star2;
              }
              default:
                return
            }
          })(block[star].name);

          block[star].label = {
            color: style.color,
            downplay: {
              opacity: 0.5
            }
          };

          if (block[star].children) {
            style = {
              opacity: 1,
              color: style.color
            };
            block[star].children.forEach(function (book) {
              book.value = 1;
              book.itemStyle = style;

              book.label = {
                color: style.color
              };

              var value = 1;
              if (bookScoreId === 0 || bookScoreId === 3) {
                value = 5;
              }

              if (bookScore[bookScoreId]) {
                bookScore[bookScoreId].value += value;
              }
              else {
                bookScore[bookScoreId] = {
                  color: colors[bookScoreId],
                  value: value
                };
              }
            });
          }
        }

        level1[i].itemStyle = {
          color: data[j].itemStyle.color
        };
      }
    }

    return (
      <div className='home'>
        <Card
          className="home-card"
          title="商品总量"
          extra={<Icon style={{ color: 'rgba(0,0,0,.45)' }} type="question-circle" />}
          style={{ width: 250 }}
          headStyle={{ color: 'rgba(0,0,0,.45)' }}
        >
          <Statistic
            value={1128163}
            suffix="个"
            style={{ fontWeight: 'bolder' }}
          />
          <Statistic
            value={15}
            valueStyle={{ fontSize: 15 }}
            prefix={'周同比'}
            suffix={<div>%<Icon style={{ color: 'red', marginLeft: 10 }} type="arrow-down" /></div>}
          />
          <Statistic
            value={10}
            valueStyle={{ fontSize: 15 }}
            prefix={'日同比'}
            suffix={<div>%<Icon style={{ color: '#3f8600', marginLeft: 10 }} type="arrow-up" /></div>}
          />
        </Card>
        <Card title='旭日图Sunburst' className="home-card-1">
          <ReactEcharts option={this.getOption()} style={{height:450}} />
        </Card>

       

        <Card
          className="home-content"
          title={<div className="home-menu">
            <span className={isVisited ? "home-menu-active home-menu-visited" : 'home-menu-visited'}
              onClick={this.handleChange(true)}>访问量</span>
            <span className={isVisited ? "" : 'home-menu-active'} onClick={this.handleChange(false)}>销售量</span>
          </div>}
          extra={<RangePicker
            defaultValue={[moment('2019/01/01', dateFormat), moment('2019/06/01', dateFormat)]}
            format={dateFormat}
          />}
        >
          <Card
            className="home-table-left"
            title={isVisited ? '访问趋势' : '销售趋势'}
            bodyStyle={{ padding: 0, height: 275 }}
            extra={<Icon type="reload" />}
          >
            <Bar />
          </Card>

          <Card title='任务' extra={<Icon type="reload" />} className="home-table-right">
            <Timeline>
              <Timeline.Item color="green">新版本迭代会</Timeline.Item>
              <Timeline.Item color="green">完成网站设计初版</Timeline.Item>
              <Timeline.Item color="red">
                <p>联调接口</p>
                <p>功能验收</p>
              </Timeline.Item>
              <Timeline.Item>
                <p>登录功能设计</p>
                <p>权限验证</p>
                <p>页面排版</p>
              </Timeline.Item>
            </Timeline>
          </Card>
        </Card>
      </div>
    )
  }
}
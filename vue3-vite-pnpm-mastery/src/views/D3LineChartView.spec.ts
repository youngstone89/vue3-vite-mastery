import { shallowMount } from '@vue/test-utils'
import * as d3 from 'd3'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import D3LineChartView from './D3LineChartView.vue'

vi.mock('d3', () => {
  const mockSelect = {
    selectAll: vi.fn().mockImplementation(function () {
      console.log('selectAll called')
      return this
    }),
    remove: vi.fn().mockImplementation(function () {
      console.log('remove called')
      return this
    }),
    attr: vi.fn().mockImplementation(function () {
      console.log('attr called', arguments)
      return this
    }),
    append: vi.fn().mockImplementation(function () {
      console.log('append called', arguments)
      return this
    }),
    call: vi.fn().mockImplementation(function () {
      console.log('call called', arguments)
      return this
    }),
    datum: vi.fn().mockImplementation(function () {
      console.log('datum called')
      return this
    }),
    text: vi.fn().mockImplementation(function () {
      console.log('text called')
      return this
    })
  }

  const mockScaleTime = {
    domain: vi.fn().mockImplementation((arg) => {
      console.log('scaleTime.domain called with:', arg)
      return mockScaleTime
    }),
    rangeRound: vi.fn().mockImplementation((arg) => {
      console.log('scaleTime.rangeRound called with:', arg)
      return mockScaleTime
    })
  }

  const mockScaleLinear = {
    domain: vi.fn().mockImplementation((arg) => {
      console.log('scaleLinear.domain called with:', arg)
      return mockScaleLinear
    }),
    rangeRound: vi.fn().mockImplementation((arg) => {
      console.log('scaleLinear.rangeRound called with:', arg)
      return mockScaleLinear
    })
  }

  const mockLine = vi.fn().mockImplementation(() => 'mocked-path-data')
  mockLine.x = vi.fn().mockImplementation((arg) => {
    console.log('line.x called with:', arg)
    return mockLine
  })
  mockLine.y = vi.fn().mockImplementation((arg) => {
    console.log('line.y called with:', arg)
    return mockLine
  })

  const mockAxisBottom = vi.fn().mockImplementation(() => {
    console.log('mockAxisBottom called')
  })
  const mockAxisLeft = vi.fn().mockImplementation(() => {
    console.log('mockAxisLeft called')
  })

  return {
    select: vi.fn((element) => {
      console.log('d3.select called with:', element)
      return mockSelect
    }),
    timeParse: vi.fn(() => (date: string) => {
      console.log('timeParse called with:', date)
      // Map specific dates to avoid timezone issues
      const dateMap: { [key: string]: Date } = {
        '24-Apr-07': new Date(2007, 3, 24), // April is 3 (0-based)
        '25-Apr-07': new Date(2007, 3, 25),
        '26-Apr-07': new Date(2007, 3, 26),
        '27-Apr-07': new Date(2007, 3, 27),
        '30-Apr-07': new Date(2007, 3, 30),
        '1-May-07': new Date(2007, 4, 1),
        '2-May-07': new Date(2007, 4, 2),
        '3-May-07': new Date(2007, 4, 3),
        '4-May-07': new Date(2007, 4, 4),
        '7-May-07': new Date(2007, 4, 7),
        '8-May-07': new Date(2007, 4, 8),
        '9-May-07': new Date(2007, 4, 9),
        '10-May-07': new Date(2007, 4, 10)
      }
      return dateMap[date] || new Date(date)
    }),
    scaleTime: vi.fn(() => {
      console.log('d3.scaleTime called')
      return mockScaleTime
    }),
    scaleLinear: vi.fn(() => {
      console.log('d3.scaleLinear called')
      return mockScaleLinear
    }),
    line: vi.fn(() => {
      console.log('d3.line called')
      return mockLine
    }),
    axisBottom: vi.fn(() => {
      console.log('d3.axisBottom called')
      return mockAxisBottom
    }),
    axisLeft: vi.fn(() => {
      console.log('d3.axisLeft called')
      return mockAxisLeft
    }),
    extent: vi.fn((data, accessor) => {
      console.log('d3.extent called with accessor:', accessor.toString())
      const values = data.map(accessor)
      if (accessor.toString().includes('parseTime')) {
        return [new Date(2007, 3, 24), new Date(2007, 4, 10)]
      }
      return [Math.min(...values), Math.max(...values)]
    })
  }
})

describe('D3LineChartView.vue', () => {
  let wrapper: any

  const testData = [
    { date: '24-Apr-07', amount: 93.24 },
    { date: '25-Apr-07', amount: 95.35 },
    { date: '26-Apr-07', amount: 98.84 },
    { date: '27-Apr-07', amount: 99.92 },
    { date: '30-Apr-07', amount: 99.8 },
    { date: '1-May-07', amount: 99.47 },
    { date: '2-May-07', amount: 100.39 },
    { date: '3-May-07', amount: 100.4 },
    { date: '4-May-07', amount: 100.81 },
    { date: '7-May-07', amount: 103.92 },
    { date: '8-May-07', amount: 105.06 },
    { date: '9-May-07', amount: 106.88 },
    { date: '10-May-07', amount: 107.34 }
  ]

  beforeEach(async () => {
    vi.clearAllMocks()
    wrapper = shallowMount(D3LineChartView, {
      data() {
        return { data: testData }
      }
    })
    await wrapper.vm.$nextTick()
  })

  it('renders the component correctly', () => {
    expect(wrapper.find('h2').text()).toBe('Vue.js and D3 Line Chart')
    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.findAll('button').length).toBe(2)
    expect(wrapper.findAll('button')[0].text()).toBe('remove')
    expect(wrapper.findAll('button')[1].text()).toBe('draw')
  })

  it('binds chartContainer ref to SVG element', () => {
    expect(wrapper.vm.chartContainer).toBeDefined()
    expect(wrapper.vm.chartContainer.tagName).toBe('svg')
  })

  it('initializes chart on mount', async () => {
    vi.clearAllMocks()
    const selectSpy = vi.spyOn(d3, 'select')
    wrapper = shallowMount(D3LineChartView, {
      data() {
        return { data: testData }
      }
    })
    await wrapper.vm.$nextTick()
    expect(selectSpy).toHaveBeenCalledTimes(1)
    expect(selectSpy).toHaveBeenCalledWith(wrapper.vm.chartContainer)
  })

  it('remove function clears SVG content', async () => {
    const selectSpy = vi.spyOn(d3, 'select')
    const removeButton = wrapper.findAll('button').find((btn: any) => btn.text() === 'remove')
    expect(removeButton.exists()).toBe(true)
    await removeButton.trigger('click')
    await wrapper.vm.$nextTick()
    expect(selectSpy).toHaveBeenCalledWith(wrapper.vm.chartContainer)
    expect(d3.select().selectAll).toHaveBeenCalledWith('*')
    expect(d3.select().selectAll).toHaveBeenCalledTimes(1)
  })

  it('draw function sets up SVG and chart', async () => {
    vi.clearAllMocks()
    const selectSpy = vi.spyOn(d3, 'select')
    const scaleTimeSpy = vi.spyOn(d3, 'scaleTime')
    const scaleLinearSpy = vi.spyOn(d3, 'scaleLinear')
    const extentSpy = vi.spyOn(d3, 'extent')
    const lineSpy = vi.spyOn(d3, 'line')
    const axisBottomSpy = vi.spyOn(d3, 'axisBottom')
    const axisLeftSpy = vi.spyOn(d3, 'axisLeft')
    const drawButton = wrapper.findAll('button').find((btn: any) => btn.text() === 'draw')
    expect(drawButton.exists()).toBe(true)
    console.log('chartContainer before click:', wrapper.vm.chartContainer)
    console.log('Triggering draw button click')
    await drawButton.trigger('click')
    await wrapper.vm.$nextTick()

    expect(selectSpy).toHaveBeenCalledTimes(1)
    expect(selectSpy).toHaveBeenCalledWith(wrapper.vm.chartContainer)
    expect(d3.select().attr).toHaveBeenCalledWith('width', 800)
    expect(d3.select().attr).toHaveBeenCalledWith('height', 500)
    expect(d3.select().append).toHaveBeenCalledWith('g')

    expect(d3.timeParse).toHaveBeenCalledWith('%d-%b-%y')

    expect(scaleTimeSpy).toHaveBeenCalledTimes(1)
    expect(scaleLinearSpy).toHaveBeenCalledTimes(1)
    expect(extentSpy).toHaveBeenCalledTimes(2)
    expect(extentSpy).toHaveBeenCalledWith(expect.any(Array), expect.any(Function))
    expect(d3.scaleTime().domain).toHaveBeenCalledWith([expect.any(Date), expect.any(Date)])
    expect(d3.scaleLinear().domain).toHaveBeenCalledWith([93.24, 107.34])
    expect(d3.scaleTime().rangeRound).toHaveBeenCalledWith([0, 800])
    expect(d3.scaleLinear().rangeRound).toHaveBeenCalledWith([500, 0])

    expect(lineSpy).toHaveBeenCalledTimes(1)
    expect(d3.line().x).toHaveBeenCalledWith(expect.any(Function))
    expect(d3.line().y).toHaveBeenCalledWith(expect.any(Function))

    const mockG = d3.select().append()
    expect(mockG.append).toHaveBeenCalledWith('g')
    expect(mockG.append().attr).toHaveBeenCalledWith('transform', 'translate(0,500)')
    expect(mockG.append().call).toHaveBeenCalledWith(expect.any(Function))
    expect(axisBottomSpy).toHaveBeenCalledTimes(1)
    expect(axisBottomSpy).toHaveBeenCalledWith(expect.any(Object))

    expect(mockG.append).toHaveBeenCalledWith('g')
    expect(mockG.append().call).toHaveBeenCalledWith(expect.any(Function))
    expect(axisLeftSpy).toHaveBeenCalledTimes(1)
    expect(axisLeftSpy).toHaveBeenCalledWith(expect.any(Object))

    expect(mockG.append().append).toHaveBeenCalledWith('text')
    expect(mockG.append().append().attr).toHaveBeenCalledWith('fill', '#000')
    expect(mockG.append().append().attr).toHaveBeenCalledWith('transform', 'rotate(-90)')
    expect(mockG.append().append().attr).toHaveBeenCalledWith('y', 6)
    expect(mockG.append().append().attr).toHaveBeenCalledWith('dy', '0.71em')
    expect(mockG.append().append().attr).toHaveBeenCalledWith('text-anchor', 'end')
    expect(mockG.append().append().text).toHaveBeenCalledWith('Price ($)')

    expect(mockG.append).toHaveBeenCalledWith('path')
    expect(mockG.append().datum).toHaveBeenCalled()
    expect(mockG.append().attr).toHaveBeenCalledWith('fill', 'none')
    expect(mockG.append().attr).toHaveBeenCalledWith('stroke', 'steelblue')
    expect(mockG.append().attr).toHaveBeenCalledWith('stroke-width', 1.5)
    expect(d3.select().attr).toHaveBeenCalledWith('d', expect.any(Function))
  })

  it('processes data correctly', async () => {
    vi.clearAllMocks()
    const extentSpy = vi.spyOn(d3, 'extent')
    await wrapper.vm.draw()
    expect(extentSpy).toHaveBeenCalledTimes(2)
    expect(extentSpy).toHaveBeenCalledWith(testData, expect.any(Function))
  })

  it('covers d3.extent accessors', async () => {
    vi.clearAllMocks()
    const extentSpy = vi.spyOn(d3, 'extent')
    await wrapper.vm.draw()

    const calls = extentSpy.mock.calls
    expect(calls.length).toBe(2)

    const dateAccessor = calls[0][1]
    const dateValues = testData.map(dateAccessor)
    expect(dateValues[0]).toBeInstanceOf(Date)
    expect(dateValues[0].getFullYear()).toBe(2007)
    expect(dateValues[0].getMonth()).toBe(3) // April
    expect(dateValues[0].getDate()).toBe(24)
    expect(dateValues[12]).toBeInstanceOf(Date)
    expect(dateValues[12].getFullYear()).toBe(2007)
    expect(dateValues[12].getMonth()).toBe(4) // May
    expect(dateValues[12].getDate()).toBe(10)

    const amountAccessor = calls[1][1]
    const amountValues = testData.map(amountAccessor)
    expect(amountValues).toEqual([
      93.24, 95.35, 98.84, 99.92, 99.8, 99.47, 100.39, 100.4, 100.81, 103.92, 105.06, 106.88, 107.34
    ])
  })
})

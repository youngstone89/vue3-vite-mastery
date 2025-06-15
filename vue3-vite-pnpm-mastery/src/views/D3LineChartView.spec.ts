import { mount } from '@vue/test-utils'
import * as d3 from 'd3'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import D3LineChartView from './D3LineChartView.vue'

vi.mock('d3', () => {
  const mockSelect = {
    selectAll: vi.fn().mockImplementation(function () {
      console.log('selectAll called') // Debug log
      return this
    }),
    remove: vi.fn().mockImplementation(function () {
      console.log('remove called') // Debug log
      return this
    }),
    attr: vi.fn().mockImplementation(function () {
      console.log('attr called', arguments) // Debug log
      return this
    }),
    append: vi.fn().mockImplementation(function () {
      console.log('append called', arguments) // Debug log
      return this
    }),
    call: vi.fn().mockImplementation(function () {
      console.log('call called', arguments) // Debug log
      return this
    }),
    datum: vi.fn().mockImplementation(function () {
      console.log('datum called') // Debug log
      return this
    }),
    text: vi.fn().mockImplementation(function () {
      console.log('text called') // Debug log
      return this
    })
  }

  const mockScaleTime = {
    domain: vi.fn().mockImplementation((arg) => {
      console.log('scaleTime.domain called with:', arg) // Debug log
      return mockScaleTime
    }),
    rangeRound: vi.fn().mockImplementation((arg) => {
      console.log('scaleTime.rangeRound called with:', arg) // Debug log
      return mockScaleTime
    })
  }

  const mockScaleLinear = {
    domain: vi.fn().mockImplementation((arg) => {
      console.log('scaleLinear.domain called with:', arg) // Debug log
      return mockScaleLinear
    }),
    rangeRound: vi.fn().mockImplementation((arg) => {
      console.log('scaleLinear.rangeRound called with:', arg) // Debug log
      return mockScaleLinear
    })
  }

  const mockLine = vi.fn().mockImplementation(() => 'mocked-path-data') // Simulate path generator function
  mockLine.x = vi.fn().mockImplementation((arg) => {
    console.log('line.x called with:', arg) // Debug log
    return mockLine
  })
  mockLine.y = vi.fn().mockImplementation((arg) => {
    console.log('line.y called with:', arg) // Debug log
    return mockLine
  })

  const mockAxisBottom = vi.fn().mockImplementation(() => {
    console.log('mockAxisBottom called') // Debug log
  })
  const mockAxisLeft = vi.fn().mockImplementation(() => {
    console.log('mockAxisLeft called') // Debug log
  })

  return {
    select: vi.fn((element) => {
      console.log('d3.select called with:', element) // Debug log
      return mockSelect
    }),
    timeParse: vi.fn(() => (date: string) => new Date(date)),
    scaleTime: vi.fn(() => {
      console.log('d3.scaleTime called') // Debug log
      return mockScaleTime
    }),
    scaleLinear: vi.fn(() => {
      console.log('d3.scaleLinear called') // Debug log
      return mockScaleLinear
    }),
    line: vi.fn(() => {
      console.log('d3.line called') // Debug log
      return mockLine
    }),
    axisBottom: vi.fn(() => {
      console.log('d3.axisBottom called') // Debug log
      return mockAxisBottom
    }),
    axisLeft: vi.fn(() => {
      console.log('d3.axisLeft called') // Debug log
      return mockAxisLeft
    }),
    extent: vi.fn((data, accessor) => {
      console.log('d3.extent called with accessor:', accessor.toString()) // Debug log
      if (accessor.toString().includes('parseTime')) {
        return [new Date('2007-04-24'), new Date('2007-05-10')]
      }
      return [93.24, 107.34] // For d.amount
    })
  }
})

describe('D3LineChartView.vue', () => {
  let wrapper: any

  beforeEach(async () => {
    vi.clearAllMocks() // Clear mocks to prevent state leakage
    wrapper = mount(D3LineChartView)
    await wrapper.vm.$nextTick() // Wait for lifecycle hooks
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
    vi.clearAllMocks() // Clear mocks before remount
    const selectSpy = vi.spyOn(d3, 'select')
    wrapper = mount(D3LineChartView) // Remount with spy active
    await wrapper.vm.$nextTick() // Wait for onMounted
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
    vi.clearAllMocks() // Clear mocks to isolate button click
    const selectSpy = vi.spyOn(d3, 'select')
    const scaleTimeSpy = vi.spyOn(d3, 'scaleTime')
    const scaleLinearSpy = vi.spyOn(d3, 'scaleLinear')
    const extentSpy = vi.spyOn(d3, 'extent')
    const lineSpy = vi.spyOn(d3, 'line')
    const axisBottomSpy = vi.spyOn(d3, 'axisBottom')
    const axisLeftSpy = vi.spyOn(d3, 'axisLeft')
    const drawButton = wrapper.findAll('button').find((btn: any) => btn.text() === 'draw')
    expect(drawButton.exists()).toBe(true) // Verify button exists
    console.log('chartContainer before click:', wrapper.vm.chartContainer) // Debug ref
    console.log('Triggering draw button click') // Debug click
    await drawButton.trigger('click')
    await wrapper.vm.$nextTick() // Ensure event is processed

    // SVG setup
    expect(selectSpy).toHaveBeenCalledTimes(1) // One call from draw
    expect(selectSpy).toHaveBeenCalledWith(wrapper.vm.chartContainer)
    expect(d3.select().attr).toHaveBeenCalledWith('width', 800)
    expect(d3.select().attr).toHaveBeenCalledWith('height', 500)
    expect(d3.select().append).toHaveBeenCalledWith('g')

    // Time parsing
    expect(d3.timeParse).toHaveBeenCalledWith('%d-%b-%y')

    // Scales
    expect(scaleTimeSpy).toHaveBeenCalledTimes(1)
    expect(scaleLinearSpy).toHaveBeenCalledTimes(1)
    expect(extentSpy).toHaveBeenCalledTimes(2)
    expect(extentSpy).toHaveBeenCalledWith(expect.any(Array), expect.any(Function))
    expect(d3.scaleTime().domain).toHaveBeenCalledWith([expect.any(Date), expect.any(Date)])
    expect(d3.scaleLinear().domain).toHaveBeenCalledWith([93.24, 107.34])
    expect(d3.scaleTime().rangeRound).toHaveBeenCalledWith([0, 800])
    expect(d3.scaleLinear().rangeRound).toHaveBeenCalledWith([500, 0])

    // Line generator
    expect(lineSpy).toHaveBeenCalledTimes(1)
    expect(d3.line().x).toHaveBeenCalledWith(expect.any(Function))
    expect(d3.line().y).toHaveBeenCalledWith(expect.any(Function))

    // Axes
    const mockG = d3.select().append()
    expect(mockG.append).toHaveBeenCalledWith('g')
    expect(mockG.append().attr).toHaveBeenCalledWith('transform', 'translate(0,500)')
    expect(mockG.append().call).toHaveBeenCalledWith(expect.any(Function))
    expect(axisBottomSpy).toHaveBeenCalledTimes(1)
    expect(axisBottomSpy).toHaveBeenCalledWith(expect.any(Object)) // x-scale

    expect(mockG.append).toHaveBeenCalledWith('g')
    expect(mockG.append().call).toHaveBeenCalledWith(expect.any(Function))
    expect(axisLeftSpy).toHaveBeenCalledTimes(1)
    expect(axisLeftSpy).toHaveBeenCalledWith(expect.any(Object)) // y-scale

    // Axis label
    expect(mockG.append().append).toHaveBeenCalledWith('text')
    expect(mockG.append().append().attr).toHaveBeenCalledWith('fill', '#000')
    expect(mockG.append().append().attr).toHaveBeenCalledWith('transform', 'rotate(-90)')
    expect(mockG.append().append().attr).toHaveBeenCalledWith('y', 6)
    expect(mockG.append().append().attr).toHaveBeenCalledWith('dy', '0.71em')
    expect(mockG.append().append().attr).toHaveBeenCalledWith('text-anchor', 'end')
    expect(mockG.append().append().text).toHaveBeenCalledWith('Price ($)')

    // Path
    expect(mockG.append).toHaveBeenCalledWith('path')
    expect(mockG.append().datum).toHaveBeenCalled()
    expect(mockG.append().attr).toHaveBeenCalledWith('fill', 'none')
    expect(mockG.append().attr).toHaveBeenCalledWith('stroke', 'steelblue')
    expect(mockG.append().attr).toHaveBeenCalledWith('stroke-width', 1.5)
    expect(mockG.append().attr).toHaveBeenCalledWith('d', expect.any(Function))
  })

  it('processes data correctly', async () => {
    vi.clearAllMocks() // Clear mocks for isolated test
    const extentSpy = vi.spyOn(d3, 'extent')
    await wrapper.vm.draw()
    expect(extentSpy).toHaveBeenCalledTimes(2)
    expect(extentSpy).toHaveBeenCalledWith(expect.any(Array), expect.any(Function))
  })

  it('draw function can be called directly', async () => {
    vi.clearAllMocks() // Clear mocks for isolated test
    const selectSpy = vi.spyOn(d3, 'select')
    await wrapper.vm.draw()
    expect(selectSpy).toHaveBeenCalledTimes(1)
    expect(selectSpy).toHaveBeenCalledWith(wrapper.vm.chartContainer)
  })
})

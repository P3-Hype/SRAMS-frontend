import { expect, it, describe } from 'vitest'
import renderer from 'react-test-renderer'
import SimpleChart from '../components/SimpleChart/SimpleChart'
//import { render, screen } from '@testing-library/react'

const data = [59,65,555,674,43,554,426,4984,513,584]

describe("SimpleChart tests", () => {
    it("renders correctly", () => {
        const component = renderer.create(
            <SimpleChart 
            title='test chart' 
            data={data}
            width={300}
            height={100}
            lineColor='#ff0000'/>
        );
        expect(component.toJSON()).toMatchSnapshot();
    })
})
import SimpleChart from '../components/SimpleChart/SimpleChart'
import { expect, it, describe, beforeEach } from 'vitest'
import { act, isCompositeComponent } from 'react-dom/test-utils';
import ReactDOM from 'react-dom/client';
import renderer from 'react-test-renderer';
//import { render, screen } from '@testing-library/react'

const data = [59,65,555,674,43,554,426,4984,513,584];

let container: HTMLDivElement;
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

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
    });

    it("renders with empty dataset", () => {
        act(() => {
            ReactDOM.createRoot(container).render(<SimpleChart
            title='test chart'
            data={[]} 
            width={300}
            height={100}
            lineColor='#ff0000' />);
        })
        const chart = container.children[0];
        isCompositeComponent(chart);
    });
});
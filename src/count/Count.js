import React from 'react';
import {connect} from 'react-redux';

import {
    incrementActionDispatcher, decrementActionDispatcher,
    delayedIcrementActionDispatcher, delayedDecrementActionDispatcher,
    setN, setDelay
} from './countModule';

// Components can be passed as props to other components, providing
// very powerful and easy dynamic runtime behaviors
// (although this is a contrived example, so it's a bit overkill here)
const Counter = ({count, component: Component}) => (
    <div>
        <Component>
            {count}
        </Component>
    </div>
);

// Higher order components used for styling (in reality, you would probably just change the `className`
// in `Counter` to achieve this)
// The special `children` prop represents whatever the component might be wrapping.
// e.g. in `<High><p>dee-ho</p></High>`, `<p>dee-ho</p>` would be passed as the `children` prop to `High`
const High = ({children}) => (
    <div style={{backgroundColor: 'red'}}>{children}</div>
);

const Medium = ({children}) => (
    <div style={{backgroundColor: 'green'}}>{children}</div>
);

const Low = ({children}) => (
    <div style={{backgroundColor: 'blue'}}>{children}</div>
);

// Props, wired up from the store via `mapStateToProps` and `mapDispatchToProps`
const Count = ({count, n, delay, setN, setDelay, increment, decrement, delayedIncrement, delayedDecrement}) => {

    let high = count > 10;
    let low = count < 0;

    return (
        <div>
            {/* Comments in JSX are weird */}
            <div>
                <div>
                    <h2>(In/De)crement value</h2>
                    {/* Firing one of our action creators (which has been wired to dispatch an action the store
                    via `mapDispatchToProps`) in reaction to a user initiated event */}
                    <input type="text" value={n} onChange={(evt) => setN(evt.target.value)}/>
                </div>
                <div>
                    <h2>Delay (ms):</h2>
                    <input type="text" value={delay} onChange={(evt) => setDelay(evt.target.value)}/>
                </div>
                <h2>Count</h2>
                <Counter
                    count={count}
                    component={
                        /* Curly braces allow us to embed arbitrary javascript expressions in our JSX...
                         * but expressions only, hence this nested ternary...
                         * in reality, it would likely be clearer to move this work up outside of the
                         * JSX, before `return` */
                        high
                            ? High
                            : low
                                ? Low
                                : Medium
                    }
                />
            </div>
            <div>
                {/* Scoping rules for JSX are the same as normal javascript, so here we've
                  * captured our `n` prop in a closure in this event handler */}
                <button onClick={() => increment(n)}>Increment</button>
            </div>
            <div>
                <button onClick={() => decrement(n)}>Decrement</button>
            </div>
            <div>
                <button onClick={() => delayedIncrement(n, delay)}>Delayed Increment</button>
            </div>
            <div>
                <button onClick={() => delayedDecrement(n, delay)}>Delayed Decrement</button>
            </div>
        </div>
    )
};

// Wiring up state from the store to props in our component
// These could even be calculated values, or whatever you feel like.
// Selectors can be helpful here
const mapStateToProps = state => ({
    count: state.count.get('count'),
    n: state.count.get('n'),
    delay: state.count.get('delay')
});

// Wiring up our action creators to dispatch to our store, which will then be passed as
// props to our component. Since action creators are just functions that return a plain object,
// if you were to call them directly in your component without wiring them up in this way, they
// would just return that plain object and then do nothing. Passing the action creators through
// `mapDispatchToProps` and `connect` is what gets those plain objects dispatched to your store when these
// functions are called
const mapDispatchToProps = {
    setN,
    setDelay,
    increment: incrementActionDispatcher,
    decrement: decrementActionDispatcher,
    delayedIncrement: delayedIcrementActionDispatcher,
    delayedDecrement: delayedDecrementActionDispatcher
};

export default connect(mapStateToProps, mapDispatchToProps)(Count);

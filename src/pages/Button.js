import React, { useState } from 'react';

const ButtonSite = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () =>
    setTimeout(() => setCount((count) => count + 1), 1000);

  const handleDecrement = () =>
    setTimeout(() => setCount((count) => count - 1), 1000);
    const [greeting, setGreeting] = useState(
        'Hello Function Component!'
      );
      const handleChange = event => setGreeting(event.target.value);
      const [selectedColor, setSelectedColor] = useState("#007bff"); // Default color

      // Function to handle color change
      const handleColorChange = (event) => {
          setSelectedColor(event.target.value);
      };
  return (
    <>
<div className="container-fluid bg-light mt-5">
    <div className="row">
        <div className="col-12 text-center   ">
            <div className="card-body mx-auto w-25">
                <h1>1..</h1>
            <h1 className='text-center'>{count}</h1>
  <div className="text-center">
  <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
  </div>
            </div>
            <div className='text-center '>
                <h1>2..</h1>
      <h1>{greeting}</h1>

      <input type="text" className='mt-3' value={greeting} onChange={handleChange} />
    </div>
        </div>
      <div className="row">
      <div className="col-12 text-center mt-4 bg-light">
        <h1>3..</h1>
      <div style={{ backgroundColor: selectedColor }} className="color-div h-100">
                <span className="color-span">Color changes</span>
            </div>

            <input type="color" className='text-center mt-3' placeholder='color chnage' value={selectedColor} onChange={handleColorChange} />
            <span style={{ color: selectedColor }}>changes color</span>
            {/* <div class="d-grid gap-2 col-6 mx-auto mt-3">
  <button class="btn btn-primary" type="button">Button</button>
  <button class="btn btn-primary" type="button">Button</button>
</div> */}
        </div>
      </div>
    </div>
</div>
    </>
  );
};

export default ButtonSite;

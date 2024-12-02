import React from 'react'

const Goals = () => {
  return (
    <div>
      <div>
        <div>
          <input type="text" />
          <input type="date" />
          <input type="submit" />
        </div>
        <div>
          <input type="checkbox" />
          <span>tag</span>
          <span>deadline(days left)</span>
        </div>
      </div>

      {/* For visual analysis */}
      <div></div>
    </div>
  );
}

export default Goals
# PI Equation Calculator Spec

This is the project spec for the PI Equation Calculator app.

## Description

The PI Equation Calculator allows users to input key financial metrics and calculates the hypothetical maximum revenue based on their sales volume, price, churn rate, and current revenue. The app visualizes the comparison between current revenue and hypothetical max.

## Core Features

- [ ] Input fields for the following:
  - [ ] Sales Volume Monthly
  - [ ] Price Monthly
  - [ ] Churn Monthly (percentage or decimal)
  - [ ] Current Revenue Monthly

- [ ] Calculate Hypothetical Max Revenue
  - Formula: Hypothetical Max = (Sales Volume * Price) / Churn

- [ ] Display Results
  - [ ] Show a graph comparing Current Revenue and Hypothetical Max
  - [ ] Indicate if:
    - [ ] Hypothetical Max is below Current Revenue: "Your business is on track to shrink down to the hypothetical max."
    - [ ] Hypothetical Max equals Current Revenue: "Your business is breaking even."
    - [ ] Hypothetical Max is above Current Revenue: "Your business has the potential to grow by X times."

### Input Field Details

- [ ] Sales Volume Monthly
  - [ ] Numeric input field

- [ ] Price Monthly
  - [ ] Numeric input field

- [ ] Churn Monthly
  - [ ] Numeric input field (percentage or decimal)

- [ ] Current Revenue Monthly
  - [ ] Numeric input field

### Graphical Representation

- [ ] Implement a graph to visualize:
  - [ ] Current Revenue vs. Hypothetical Max
  - [ ] Use clear labels and legends for better understanding

### User Feedback

- [ ] Provide clear messages based on the comparison of Current Revenue and Hypothetical Max.
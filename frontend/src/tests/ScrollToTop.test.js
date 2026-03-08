import { render, fireEvent } from "@testing-library/react";
import  ScrollToTop  from "../components/ScrollToTop/ScrollToTop";

/*describe("ScrollToTop", () => {
  it(" deberia renderizar sin problemas", () => {
    const { getByAltText } = render(<ScrollToTop />);
    expect(getByAltText("")).toBeInTheDocument();
  });

  it("deberia hacer scrollToTop al clickear", () => {
    window.scrollTo = jest.fn();
    const { getByAltText } = render(<ScrollToTop />);
    fireEvent.click(getByAltText(""));
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0 });
  });
});*/

import { toTop } from "../components/ScrollToTop/ScrollToTop";

describe("toTop", () => {
  it("debería llamar a window.scrollTo con { top: 0 }", () => {
    window.scrollTo = jest.fn();
    toTop();
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0 });
  });
});


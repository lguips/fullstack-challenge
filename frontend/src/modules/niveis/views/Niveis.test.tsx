import { describe, it, expect, vi } from "vitest";
import Niveis from "./Niveis.tsx";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import axios from "axios";

const successResponseMock = {
  data: [
    {
      id: 1,
      nivel: "Nivel 1",
    },
    {
      id: 2,
      nivel: "Nivel 2",
    },
  ],
};

describe("Niveis integration tests with modals and api calls", () => {
  it("should render two nivel with correct response", async () => {
    vi.spyOn(axios, "get").mockImplementation(() => {
      return Promise.resolve(successResponseMock);
    });

    const { findByText } = render(<Niveis />);

    expect(await findByText("Nivel 1"));
    expect(await findByText("Nivel 2"));
  });

  it("should add nivel when modal is opened and submitted", async () => {
    vi.spyOn(axios, "post").mockImplementation(() => {
      return Promise.resolve({
        data: {
          id: 3,
          nivel: "Nivel 3",
        },
      });
    });

    const user = userEvent.setup();
    const { findByText, findByTestId } = render(<Niveis />);

    const showModalButton = await findByTestId("show-add-modal-button");
    await user.click(showModalButton);

    const input = await findByTestId("add-nivel-input");
    await user.type(input, "Nivel 3");

    const addNivelSubmitButton = await findByTestId("add-nivel-submit-button");
    await user.click(addNivelSubmitButton);

    expect(await findByText("Nivel 3")).toBeInTheDocument();
  });

  it("should exclude nivel on confirm", async () => {
    vi.spyOn(axios, "delete").mockImplementation(() => {
      return Promise.resolve();
    });

    const user = userEvent.setup();

    const { findByText, findByTestId, queryByText, findAllByTestId } = render(
      <Niveis />
    );

    const excludeButtons = await findAllByTestId("remove-button");
    await user.click(excludeButtons[0]);

    expect(await findByText("Excluir um nível")).toBeInTheDocument();

    await user.click(await findByTestId("submit-remove"));

    expect(queryByText("Nivel 1")).not.toBeInTheDocument();
  });

  it("should edit nivel", async () => {
    vi.spyOn(axios, "put").mockImplementation(() => {
      return Promise.resolve({
        data: {
          id: 1,
          nivel: "Nivel 1 editado",
        },
      });
    });

    const user = userEvent.setup();

    const { findByText, findByTestId, findAllByTestId } = render(<Niveis />);

    const editButtons = await findAllByTestId("edit-button");
    await user.click(editButtons[0]);

    const editNivelInput = await findByTestId("edit-nivel-input");
    await user.type(editNivelInput, "Nivel 1 editado");

    const editNivelConfirmButton = await findByTestId("edit-submit");
    await user.click(editNivelConfirmButton);

    expect(await findByText("Nivel 1 editado")).toBeInTheDocument();
  });
});

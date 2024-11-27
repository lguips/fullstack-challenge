import { describe, it, expect, vi } from "vitest";
import Desenvolvedores from "./Desenvolvedores.tsx";
import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import axios from "axios";

class MockPointerEvent extends Event {
  button: number;
  ctrlKey: boolean;
  pointerType: string;

  constructor(type: string, props: PointerEventInit) {
    super(type, props);
    this.button = props.button || 0;
    this.ctrlKey = props.ctrlKey || false;
    this.pointerType = props.pointerType || "mouse";
  }
}
window.PointerEvent = MockPointerEvent as any;
window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();

const successResponseMock = {
  data: [
    {
      id: 1,
      nome: "Dev 1",
      sexo: "M",
      data_nascimento: "2024-11-03",
      idade: 30,
      hobby: "any_hobby",
      nivel: {
        id: 15,
        nivel: "Nivel 1",
      },
    },
    {
      id: 2,
      nome: "Dev 2",
      sexo: "M",
      data_nascimento: "2024-11-03",
      idade: 30,
      hobby: "any_hobby",
      nivel: {
        id: 15,
        nivel: "Nivel 1",
      },
    },
  ],
};

describe("Desenvolvedores integration tests with modals and api calls", () => {
  it("should render two devs with correct response", async () => {
    vi.spyOn(axios, "get").mockImplementation(() => {
      return Promise.resolve(successResponseMock);
    });

    const { findByText } = render(<Desenvolvedores />);

    expect(await findByText("Dev 1"));
    expect(await findByText("Dev 2"));
  });

  it("should add dev when modal is opened and submitted", async () => {
    vi.spyOn(axios, "post").mockImplementation(() => {
      return Promise.resolve({
        data: {
          id: 3,
          nome: "Dev 3",
          sexo: "M",
          data_nascimento: "09/01/1994",
          idade: 30,
          hobby: "any_hobby",
          nivel: {
            id: 1,
            nivel: "Nivel 1",
          },
        },
      });
    });

    vi.spyOn(axios, "get").mockImplementation(() => {
      return Promise.resolve({
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
      });
    });

    const user = userEvent.setup();
    const { findByText, findByTestId, getByRole } = render(<Desenvolvedores />);

    const showModalButton = await findByTestId("show-add-modal-button");
    await user.click(showModalButton);

    expect(
      await findByText(
        "Complete as informações para cadastrar um desenvolvedor"
      )
    ).toBeInTheDocument();

    const inputName = await findByTestId("dev-input-name");
    const inputBirthday = await findByTestId("dev-input-birthday");
    const inputAge = await findByTestId("dev-input-age");
    const inputHobby = await findByTestId("dev-input-hobby");

    const trigger = getByRole("combobox", {
      name: "Sex",
    });
    expect(trigger).toBeInTheDocument();

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(getByRole("option", { name: "Masculino" })).toBeInTheDocument();
    expect(getByRole("option", { name: "Feminino" })).toBeInTheDocument();

    await user.click(getByRole("option", { name: "Masculino" }));

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(within(trigger).getByText("Masculino")).toBeInTheDocument();

    const triggerNivel = getByRole("combobox", {
      name: "Nivel",
    });
    expect(triggerNivel).toBeInTheDocument();

    await user.click(triggerNivel);

    expect(triggerNivel).toHaveAttribute("aria-expanded", "true");
    expect(getByRole("option", { name: "Nivel 1" })).toBeInTheDocument();
    expect(getByRole("option", { name: "Nivel 2" })).toBeInTheDocument();

    await user.click(getByRole("option", { name: "Nivel 1" }));

    expect(triggerNivel).toHaveAttribute("aria-expanded", "false");
    expect(within(triggerNivel).getByText("Nivel 1")).toBeInTheDocument();

    await user.type(inputName, "Dev 3");
    await user.type(inputBirthday, "09/01/1994");
    await user.type(inputAge, "30");
    await user.type(inputHobby, "any_hobby");

    const addNivelSubmitButton = await findByTestId("add-dev-submit-button");
    await user.click(addNivelSubmitButton);

    expect(await findByText("Dev 3")).toBeInTheDocument();
  });

  it("should exclude dev on confirm", async () => {
    vi.spyOn(axios, "get").mockImplementation(() => {
      return Promise.resolve(successResponseMock);
    });

    vi.spyOn(axios, "delete").mockImplementation(() => {
      return Promise.resolve();
    });

    const user = userEvent.setup();

    const { findByText, findByTestId, queryByText, findAllByTestId } = render(
      <Desenvolvedores />
    );

    const excludeButtons = await findAllByTestId("remove-button");
    await user.click(excludeButtons[0]);

    expect(await findByText("Excluir um desenvolvedor")).toBeInTheDocument();

    await user.click(await findByTestId("submit-remove"));

    expect(queryByText("Dev 1")).not.toBeInTheDocument();
  });

  // it("should edit dev", async () => {
  //   vi.spyOn(axios, "get").mockImplementation(() => {
  //     return Promise.resolve({
  //       data: [
  //         {
  //           id: 1,
  //           nivel: "Nivel 1",
  //         },
  //         {
  //           id: 2,
  //           nivel: "Nivel 2",
  //         },
  //       ],
  //     });
  //   });

  //   vi.spyOn(axios, "put").mockImplementation(() => {
  //     return Promise.resolve({
  //       data: {
  //         nome: "Dev 1 editado"
  //       },
  //     });
  //   });

  //   const user = userEvent.setup();

  //   const { findByText, findAllByTestId, findByTestId } = render(
  //     <Desenvolvedores />
  //   );

  //   const editButtons = await findAllByTestId("edit-button");

  //   await user.click(editButtons[0]);

  //   expect(await findByText("Altere os dados para editar um desenvolvedor")).toBeInTheDocument();

  //   const editNivelInput = await findByTestId("edit-dev-name-input");
  //   await user.type(editNivelInput, "Dev 1 editado");

  //   const editNivelConfirmButton = await findByTestId("edit-submit");
  //   await user.click(editNivelConfirmButton);

  //   expect(await findByText("Dev 1 editado")).toBeInTheDocument();
  // });
});

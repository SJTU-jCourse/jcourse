import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ReviewReactionButton from "@/components/review-reaction-button";
import { ReviewReaction } from "@/lib/models";

describe("review reaction button", () => {
  let approveButton: HTMLElement;
  let disapproveButton: HTMLElement;
  let onReaction: jest.Mock<(id: number, reaction: number) => void>;
  beforeEach(() => {
    onReaction = jest.fn();
    const reaction: ReviewReaction = { id: 1, approves: 10, disapproves: 20 };
    render(
      <ReviewReactionButton onReaction={onReaction} reactionProps={reaction} />
    );
    approveButton = screen.getByText("10");
    disapproveButton = screen.getByText("20");
  });

  it("renders two buttons", () => {
    expect(approveButton).toBeInTheDocument();
    expect(disapproveButton).toBeInTheDocument();
  });

  it("clicks approve and reset", async () => {
    await userEvent.click(approveButton);
    expect(approveButton).toHaveTextContent("11");
    expect(disapproveButton).toHaveTextContent("20");
    expect(onReaction).toHaveBeenCalledWith(1, 1);
    await userEvent.click(approveButton);

    expect(approveButton).toHaveTextContent("10");
    expect(disapproveButton).toHaveTextContent("20");
    expect(onReaction).toHaveBeenCalledWith(1, 0);
    expect(onReaction).toHaveBeenCalledTimes(2);
  });

  it("clicks disapprove and reset", async () => {
    await userEvent.click(disapproveButton);
    expect(approveButton).toHaveTextContent("10");
    expect(disapproveButton).toHaveTextContent("21");
    expect(onReaction).toHaveBeenCalledTimes(1);
    expect(onReaction).toHaveBeenCalledWith(1, -1);

    await userEvent.click(disapproveButton);
    expect(approveButton).toHaveTextContent("10");
    expect(disapproveButton).toHaveTextContent("20");
    expect(onReaction).toHaveBeenCalledWith(1, 0);
    expect(onReaction).toHaveBeenCalledTimes(2);
  });

  it("clicks and exchange", async () => {
    await userEvent.click(disapproveButton);
    expect(approveButton).toHaveTextContent("10");
    expect(disapproveButton).toHaveTextContent("21");
    expect(onReaction).toHaveBeenCalledWith(1, -1);
    expect(onReaction).toHaveBeenCalledTimes(1);

    await userEvent.click(approveButton);
    expect(approveButton).toHaveTextContent("11");
    expect(disapproveButton).toHaveTextContent("20");
    expect(onReaction).toHaveBeenCalledWith(1, 1);
    expect(onReaction).toHaveBeenCalledTimes(2);

    await userEvent.click(disapproveButton);
    expect(approveButton).toHaveTextContent("10");
    expect(disapproveButton).toHaveTextContent("21");
    expect(onReaction).toHaveBeenCalledWith(1, -1);
    expect(onReaction).toHaveBeenCalledTimes(3);
  });
});

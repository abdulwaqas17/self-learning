import { create } from "zustand";

export const useCanvasStore = create((set) => ({
  strokes: [],
  currentStrokes: {},

  // ==================================
  // start a new stroke for a user with the initial point
  // ==================================
  startStroke: ({ userId, strokeId, point }) =>
    set((state) => ({
      currentStrokes: {
        ...state.currentStrokes,
        [userId]: {
          strokeId,
          points: [point],
        },
      },
    })),

  // ==================================
  // add a point to the current stroke of a user
  // ==================================
  addPoint: ({ userId, point }) =>
    set((state) => ({
      currentStrokes: {
        ...state.currentStrokes,
        [userId]: {
          ...state.currentStrokes[userId],
          points: [...state.currentStrokes[userId].points, point],
        },
      },
    })),

  // ==================================
  // end the stroke of a user and move it from currentStrokes to strokes array
  // ===================================
endStroke: ({ userId, color, brushSize }) =>
  set((state) => {
    const current = state.currentStrokes[userId];

    if (!current) return {};

    const finishedStroke = {
      strokeId: current.strokeId,
      userId,
      color,
      brushSize,
      points: current.points,
    };

    const { [userId]: _, ...rest } = state.currentStrokes;

    return {
      strokes: [...state.strokes, finishedStroke],
      currentStrokes: rest,
    };
  }),

  // ==================================
  // undo the last stroke of a user
  //===================================
  undo: (strokeId) =>
    set((state) => ({
      strokes: state.strokes.filter((stroke) => stroke.strokeId !== strokeId),
    })),

  // ==================================
  // clear all strokes from the canvas
  // ==================================
  clear: () =>
    set({
      strokes: [],
    }),
}));

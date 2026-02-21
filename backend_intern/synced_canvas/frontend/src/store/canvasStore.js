import { create } from "zustand";

export const useCanvasStore = create((set) => ({
  strokes: [],
  currentStroke: [],

  addPoint: (point) =>
    set((state) => ({
      currentStroke: [...state.currentStroke, point],
    })),

  startStroke: (point) =>
    set({
      currentStroke: [point],
    }),

  endStroke: (color, brushSize) =>
    set((state) => ({
      strokes: [
        ...state.strokes,
        {
          strokeId: crypto.randomUUID(),
          color,
          brushSize,
          points: state.currentStroke,
        },
      ],
      currentStroke: [],
    })),

  undo: () =>
    set((state) => ({
      strokes: state.strokes.slice(0, -1),
    })),

  clear: () =>
    set({
      strokes: [],
    }),
}));
import { create } from "zustand";

export const useCanvasStore = create((set) => ({
  strokes: [],
  currentStrokes: {},

  startStroke: ({userId, strokeId, point}) =>
  set((state) => ({
    currentStrokes: {
      ...state.currentStrokes,
      [userId]: {
        strokeId,
        points: [point],
      },
    },
  })),

  addPoint: ({userId, point}) =>
  set((state) => ({
    currentStrokes: {
      ...state.currentStrokes,
      [userId]: {
        ...state.currentStrokes[userId],
        points: [
          ...state.currentStrokes[userId].points,
          point,
        ],
      },
    },
  })),

 endStroke: ({userId, color, brushSize}) =>
  set((state) => {

    // stroke packet to be sent to server and stored in strokes array
    const finishedStroke = {
      strokeId: state.currentStrokes[userId].strokeId,
      userId,
      color,
      brushSize,
      points: state.currentStrokes[userId].points,
    };

    const { [userId]: _, ...rest } = state.currentStrokes;

    return {
      strokes: [...state.strokes, finishedStroke],
      currentStrokes: rest,
    };
  }),

  undo: () =>
    set((state) => ({
      strokes: state.strokes.slice(0, -1),
    })),

  clear: () =>
    set({
      strokes: [],
    }),
}));
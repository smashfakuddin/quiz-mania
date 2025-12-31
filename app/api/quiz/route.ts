import dbConnect from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Quiz from "@/models/quiz-model";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { title, description, createdBy, isPublished } = body;

    if (!title || !createdBy) {
      return NextResponse.json(
        { message: "Title and createdBy are required" },
        { status: 400 }
      );
    }

    const quiz = await Quiz.create({
      title,
      description,
      createdBy,
      isPublished: isPublished || false,
    });

    return NextResponse.json({ success: true, data: quiz }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { id } = body;
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Quiz ID is required" },
        { status: 400 }
      );
    }

    const quiz = await Quiz.findByIdAndDelete(id);

    return NextResponse.json(
      { success: true, message: "Deleted Successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}


export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { id, title, description, isPublished } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Quiz ID is required" },
        { status: 400 }
      );
    }

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      id,
      { title, description, isPublished },
      { new: true, runValidators: true } // return updated doc and validate
    );

    if (!updatedQuiz) {
      return NextResponse.json(
        { success: false, message: "Quiz not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedQuiz, message: "Quiz updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

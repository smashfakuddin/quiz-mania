import dbConnect from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Quiz from "@/models/quiz-model";
import Question from "@/models/question-model";
import { revalidatePath, revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    console.log("userid server", userId);
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID required" },
        { status: 400 }
      );
    }
    const quizzes = await Quiz.find({ createdBy: userId })
      .populate({
        path: "questions",
        select: "questionText note options marks",
      })
      .sort({ createdAt: -1 });
    console.log(quizzes);
    const dashboardData = {
      totalQuiz: quizzes.length,
      totalQuestion: quizzes.reduce(
        (total, quiz) => total + quiz.questions.length,
        0
      ),
      published: quizzes.filter((q) => q.isPublished).length,
      unpublished: quizzes.filter((q) => !q.isPublished).length,
    };
    return NextResponse.json(
      {
        success: true,
        data: {
          quizzes,
          dashboard: dashboardData,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET ALL QUIZZES ERROR:", error);
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
}

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
    revalidatePath("/admin");
    return NextResponse.json(
      { success: true, data: quiz, message: "Quiz Created Successfully" },
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
      {
        success: true,
        data: updatedQuiz,
        message: "Quiz updated successfully",
      },
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

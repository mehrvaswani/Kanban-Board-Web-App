# Kanban-Board-Web-App

## Overview
A Kanban Board allows users to create and manage a workflow that is accessible on multiple devices. The board incorporates columns to represent the different stages in a workflow and specific tasks can be added to each column. These tasks can move from left to right.

## Requirements
Users can create a new kanban board with a unique code, title, and three default empty columns (”To Do”, ”In Progress”, ”Completed”).
• Users can view an existing kanban board with a specific code, displaying all stored information pertaining to that board.
• Users can add tasks to a board containing a title, description, subtasks in the form of a checklist, and a status dropdown to move the cards to different columns immediately to its right. Once in the ”completed” column, the card cannot be moved.
• Users can delete tasks and an appropriate error message is displayed to confirm the user’s selection prior to deleting.
• Users can create custom kanban boards in addition to default boards, allowing them to add and delete columns from boards. Each column has a title, a button to add tasks, and another button to delete the columnn.
• Users can create and access a kanban board using a unique secret key developed using the nanoid package. The key is stored with the board on the server and returned to the user when requested. The user can view, edit, and delete items on the board and the board itself only using the correct secret key.
• Users can register and login. All users, regardless of whether they are registered and logged in or not, can view and edit boards using the board code and secret key.

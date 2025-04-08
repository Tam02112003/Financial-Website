package com.nhom4.financial.controller.api;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.nhom4.financial.dto.CategoryReportDTO;
import com.nhom4.financial.dto.SummaryReportDTO;
import com.nhom4.financial.dto.TransactionDTO;
import com.nhom4.financial.repository.UserRepository;
import com.nhom4.financial.service.ReportService;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {
    private final ReportService reportService;
    private final UserRepository userRepository;

    public ReportController(ReportService reportService, UserRepository userRepository) {
        this.reportService = reportService;
        this.userRepository = userRepository;
    }

    @GetMapping("/summary")
    public SummaryReportDTO getSummaryReport(
            Authentication authentication,
            @RequestParam String timeRange) {
        String username = authentication.getName();
        Long userId = userRepository.findByUsername(username).get().getId();
        return reportService.getSummaryReport(userId, timeRange);
    }

    @GetMapping("/by-category")
    public CategoryReportDTO getCategoryReport(
            Authentication authentication,
            @RequestParam String timeRange) {
        String username = authentication.getName();
        Long userId = userRepository.findByUsername(username).get().getId();
        return reportService.getCategoryReport(userId, timeRange);
    }
    // Endpoint mới: Báo cáo chi tiết
    @GetMapping("/details")
    public List<TransactionDTO> getDetailedReport(
            Authentication authentication,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate) {
        String username = authentication.getName();
        Long userId = userRepository.findByUsername(username).get().getId();
        return reportService.getDetailedReport(userId, startDate, endDate);
    }

    @GetMapping(value = "/details/export-pdf", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> exportDetailedReportToPdf(
            Authentication authentication,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate) throws DocumentException {

        String username = authentication.getName();
        Long userId = userRepository.findByUsername(username).get().getId();
        List<TransactionDTO> transactions = reportService.getDetailedReport(userId, startDate, endDate);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        Document document = new Document();

        try {
            PdfWriter.getInstance(document, baos);
            document.open();

            // Tiêu đề báo cáo
            document.add(new Paragraph("Báo Cáo Giao Dịch Chi Tiết"));
            document.add(new Paragraph(String.format("Từ ngày: %s đến %s",
                    new SimpleDateFormat("dd/MM/yyyy").format(startDate),
                    new SimpleDateFormat("dd/MM/yyyy").format(endDate))));
            document.add(new Paragraph(" "));

            // Tạo bảng
            PdfPTable table = new PdfPTable(6);
            table.setWidthPercentage(100);

            // Tiêu đề cột
            addPdfTableHeader(table, "ID");
            addPdfTableHeader(table, "Ngày");
            addPdfTableHeader(table, "Mô tả");
            addPdfTableHeader(table, "Danh mục");
            addPdfTableHeader(table, "Số tiền");
            addPdfTableHeader(table, "Loại");

            // Dữ liệu
            for (TransactionDTO t : transactions) {
                addPdfTableCell(table, t.getId().toString());
                addPdfTableCell(table, new SimpleDateFormat("dd/MM/yyyy").format(t.getDate()));
                addPdfTableCell(table, t.getDescription());
                addPdfTableCell(table, t.getCategoryName());
                addPdfTableCell(table, String.format("%,.0f VND", t.getAmount()));
                addPdfTableCell(table, "income".equals(t.getType()) ? "Thu" : "Chi");
            }

            document.add(table);
        } finally {
            document.close();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData(
                "attachment",
                String.format("bao-cao-%s-%s.pdf",
                        new SimpleDateFormat("yyyyMMdd").format(startDate),
                        new SimpleDateFormat("yyyyMMdd").format(endDate))
        );

        return ResponseEntity.ok()
                .headers(headers)
                .body(baos.toByteArray());
    }

    @GetMapping(value = "/details/export-excel", produces = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    public ResponseEntity<byte[]> exportDetailedReportToExcel(
            Authentication authentication,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate) throws IOException {

        String username = authentication.getName();
        Long userId = userRepository.findByUsername(username).get().getId();
        List<TransactionDTO> transactions = reportService.getDetailedReport(userId, startDate, endDate);

        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Giao dịch");

            // Tạo kiểu cho header
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);

            // Tạo header
            Row headerRow = sheet.createRow(0);
            String[] headers = {"ID", "Ngày", "Mô tả", "Danh mục", "Số tiền", "Loại"};
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
            }

            // Đổ dữ liệu
            int rowNum = 1;
            for (TransactionDTO t : transactions) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(t.getId());
                row.createCell(1).setCellValue(new SimpleDateFormat("dd/MM/yyyy").format(t.getDate()));
                row.createCell(2).setCellValue(t.getDescription());
                row.createCell(3).setCellValue(t.getCategoryName());
                row.createCell(4).setCellValue(t.getAmount());
                row.createCell(5).setCellValue("income".equals(t.getType()) ? "Thu" : "Chi");
            }

            // Tự động điều chỉnh độ rộng cột
            for (int i = 0; i < headers.length; i++) {
                sheet.autoSizeColumn(i);
            }

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            workbook.write(baos);

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
            responseHeaders.setContentDispositionFormData(
                    "attachment",
                    String.format("bao-cao-%s-%s.xlsx",
                            new SimpleDateFormat("yyyyMMdd").format(startDate),
                            new SimpleDateFormat("yyyyMMdd").format(endDate))
            );

            return ResponseEntity.ok()
                    .headers(responseHeaders)
                    .body(baos.toByteArray());
        }
    }

    private void addPdfTableHeader(PdfPTable table, String header) {
        PdfPCell cell = new PdfPCell(new Phrase(header));
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setBackgroundColor(new BaseColor(220, 220, 220));
        table.addCell(cell);
    }

    private void addPdfTableCell(PdfPTable table, String content) {
        PdfPCell cell = new PdfPCell(new Phrase(content));
        cell.setPadding(5);
        table.addCell(cell);
    }

}